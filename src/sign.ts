#!/usr/bin/env node

import {
    copyFileSync,
    existsSync,
    lstatSync,
    MakeDirectoryOptions,
    mkdirSync,
    readFileSync,
    rmSync,
    writeFileSync
} from "fs";
import "crypto"
import {GlobSync} from "glob";
import {md, pki, util} from "node-forge";
import path from "path";
import assert from "assert";
import {create as createTar} from "tar"
import {max} from "lodash";


const BUILD_DIR = "build"
const OUT_DIR = "dist"

const mkdir = (path: string, opts: MakeDirectoryOptions) => {
    if (!existsSync(path)) {
        mkdirSync(path, opts)
    }
}

const signDirectory = (directory: string, signKey: string, verifyKey: string) => {
    let accountKey = pki.privateKeyFromPem(signKey)
    let checkKey = pki.publicKeyFromPem(verifyKey)
    let buildGlob = new GlobSync(`${directory}/**`)
    buildGlob.found.forEach((file) => {
        if (lstatSync(file).isFile()) {
            console.log(`Signing ${file}`)
            let targetFile = file
                .replace("meta", "meta-sign")
                .replace("www", "www-sign")
            let parent = path.dirname(targetFile)
            console.log(`Creating ${parent}`)
            mkdir(parent, {recursive: true})
            let content = readFileSync(file)
            let messageDigest = md.sha256.create()
            messageDigest.update(content.toString("binary"), "raw")
            let signature = util.binary.raw.decode(accountKey.sign(messageDigest))
            writeFileSync(`${targetFile}.sign`, signature)
            console.log(`Created signature file ${targetFile}.sign`)

            // Verify
            let check = checkKey.verify(
                messageDigest.digest().bytes(),
                readFileSync(`${targetFile}.sign`).toString("binary")
            )
            if (check) {
                console.log(` => Signed ${file} successfully`)
            } else {
                console.error(`Verification failed for ${file} signature`)
                process.exit(2)
            }
        }
    })
}

const isDigit = (str: string) => {
    let n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

const getTargetPath = (path: string) => {
    let filteredPath = path.replace(`${BUILD_DIR}/`, "")
    if (filteredPath.includes("evam.json")) {
        return `${OUT_DIR}/meta/${filteredPath}`
    } else if (filteredPath.includes("robots.txt") || filteredPath.includes("manifest.json") || filteredPath === BUILD_DIR) {
        return undefined
    } else {
        return `${OUT_DIR}/www/${filteredPath}`
    }
}

const sign = () => {
    let pubKey = undefined
    let privKey = undefined
    console.error(`Note: the build directory is expected to be '${BUILD_DIR}'`)
    process.argv.forEach((arg, ind) => {
        if (arg === "--public") {
            pubKey = process.argv[ind + 1]
        } else if (arg === "--private") {
            privKey = process.argv[ind + 1]
        }
    })

    if (!pubKey || !privKey) {
        console.error(`Usage: $ npm exec ${process.argv[1].split("/").pop()} -- --public <PUBLIC_KEY_FILE> --private <PRIVATE_KEY_FILE>`)
        process.exit(1)
    }

    let pub = undefined
    let priv = undefined

    try {
        pub = readFileSync(pubKey).toString()
    } catch (e) {
        console.error(`Could not read ${pubKey}, check path and permissions`)
        process.exit(2)
    }

    try {
        priv = readFileSync(privKey).toString()
    } catch (e) {
        console.error(`Could not read ${pubKey}, check path and permissions`)
        process.exit(2)
    }

    try {
        rmSync(OUT_DIR, {recursive: true, force: true})
    } catch (e) {
        // DO nothing
    }

    let evamManifest: {
        version: string;
        versionCode: unknown;
        applicationId: unknown;
        applicationName: unknown;
        settings: unknown;
        logo: unknown;
        apiVersion: { target: unknown; minimum: unknown; };
        permissions: unknown;
    } = undefined
    try {
        let manifestContent = readFileSync(`${BUILD_DIR}/evam.json`).toString()
        evamManifest = JSON.parse(manifestContent)

        console.log("Checking Evam Manifest format...")
        assert(evamManifest.version)
        assert(evamManifest.versionCode)
        assert(evamManifest.applicationId)
        assert(evamManifest.applicationName)
        assert(evamManifest.settings)
        assert(evamManifest.logo)
        assert(evamManifest.apiVersion.target)
        assert(evamManifest.apiVersion.minimum)
        assert(evamManifest.permissions)

        evamManifest.version.split(".").forEach((value) => {
            assert(isDigit(value), "version must follow format: X.Y.Z where X,Y,Z are positive integers.")
        })
        assert(evamManifest.version.split(".").length === 3, "version must follow format: X.Y.Z where X,Y,Z are positive integers.")
        console.log("Evam Manifest format OK")
    } catch (e) {
        console.error(`Failed while checking Evam Manifest: ${e.message}`)
        console.error(`Could not parse the Evam Manifest at ${BUILD_DIR}/evam.json, make sure you have built your app with 'npm run build' and that your Evam manifest format is correct.`)
        process.exit(2)
    }


    mkdir(OUT_DIR, {})
    mkdir(`${OUT_DIR}/www`, {})
    mkdir(`${OUT_DIR}/meta`, {})
    mkdir(`${OUT_DIR}/pki`, {})
    mkdir(`${OUT_DIR}/www-sign`, {})
    mkdir(`${OUT_DIR}/meta-sign`, {})

    copyFileSync(pubKey, `${OUT_DIR}/pki/public.pem`)

    let buildGlob = new GlobSync("build/**")
    buildGlob.found.forEach((file) => {
        let targetPath = getTargetPath(file)
        if (targetPath) {
            if (lstatSync(file).isDirectory()) {
                mkdir(targetPath, {})
                console.log(`Creating ${targetPath}`)
            } else {
                copyFileSync(file, targetPath)
                console.log(`Copied ${file} to ${targetPath}`)
            }
        }
    })

    signDirectory(`${OUT_DIR}/meta`, priv, pub)
    signDirectory(`${OUT_DIR}/www`, priv, pub)

    // Tarball
    createTar(
        {file: `${evamManifest.version}.tar.gz`, gzip: true},
        [OUT_DIR]
    ).then(() => {
        let releaseSentences = [
            `Created release file at ${evamManifest.version}.tar.gz`,
            "This is the file you should upload to the Developer Portal.",
            "Refer to the documentation at www.documentation.evam.life."
        ]
        let panelWidth = max(releaseSentences.map((sentence) => sentence.length))
        console.log("\n\n")
        console.log("=".repeat(panelWidth))
        releaseSentences.forEach((sentence) => console.log(sentence))
        console.log("=".repeat(panelWidth))
    }).catch((err) => {
        console.error(`Failed to create release file ${err}`)
        process.exit(2)
    })
}

sign()