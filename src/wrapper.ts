#!/usr/bin/env node
import Adb from "@devicefarmer/adbkit";
import Bluebird, {reject} from "bluebird";
import fs from "fs";
import glob from "glob";

const client = Adb.createClient();

/* istanbul ignore next */
const run = async () => {
    try {
        const devices = await client.listDevices();
        if (devices.length === 0){
            console.error(`Cannot communicate with Evam device. Make sure your device is connected.`)
            return
        }
        if (!fs.existsSync('build/.')){
            console.error("No build directory found, make sure to run 'npm run build'.")
            return
        }
        await Bluebird.map(devices, async (device) => {
            const dev = await client.getDevice(device.id)

            console.log(`Installing to ${dev.serial}...`)

            // Create development directory on device
            const comCreateDirWww = await dev.shell("mkdir -p /data/local/tmp/life.evam.hydras/dist/www/")
            await new Bluebird((resolve, reject) => {
                comCreateDirWww.on('end', () => {
                    console.log("Created directory")
                    resolve()
                })
                comCreateDirWww.on('error', (e) => {
                    console.error("Failed to create directory")
                    reject(e)
                })
            })

            const comCreateDirMeta = await dev.shell("mkdir -p /data/local/tmp/life.evam.hydras/dist/meta/")
            await new Bluebird((resolve, reject) => {
                comCreateDirMeta.on('end', () => {
                    console.log("Created directory")
                    resolve()
                })
                comCreateDirMeta.on('error', (e) => {
                    console.error("Failed to create directory")
                    reject(e)
                })
            })

            // Push build directory
            let res = glob("build/**", (er, files) => {
                files.forEach( async (file) => {
                    if (fs.lstatSync(file).isDirectory()){
                        const fileOnDevice = file.replace("build", "")
                        let targetDir = "www"
                        if (fileOnDevice.includes("evam.json")){
                            targetDir = "meta"
                        }
                        console.log(`Pushing ${fileOnDevice}`)
                        const comCreateDir = await dev.shell(`mkdir -p /data/local/tmp/life.evam.hydras/dist/${targetDir}/${fileOnDevice}`)
                        await new Bluebird((resolve, reject) => {
                            comCreateDir.on('error', (e) => {
                                console.error(`Failed to create ${file}`)
                                reject(e)
                            })
                        })
                    } else {
                        const fileOnDevice = file.replace("build", "")
                        console.log(`Pushing ${fileOnDevice}`)
                        let targetDir = "www"
                        if (fileOnDevice.includes("evam.json")){
                            targetDir = "meta"
                        }

                        const comPush = await dev.push(file, `/data/local/tmp/life.evam.hydras/dist/${targetDir}/${fileOnDevice}`)
                        await new Bluebird((resolve, reject) => {
                            comPush.on('error', (e) => {
                                console.error(`Failed pushing ${file}`)
                                reject(e)
                            })
                        })
                    }
                })
            })
        })
    } catch (e) {
        console.error(e)
        reject(e)
    }
}

run()
    .then(() => {console.log("Started installation")})
    .catch((e) => {console.error(`Failed: ${e}`)})