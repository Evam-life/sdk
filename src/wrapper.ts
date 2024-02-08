#!/usr/bin/env node
import Adb from "@devicefarmer/adbkit";
import Bluebird, {reject} from "bluebird";
import fs from "fs";
import glob from "glob";
import Sync from "@devicefarmer/adbkit/dist/src/adb/sync";

function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
    for (let i = 0; i < arr.length; i += n) {
        yield arr.slice(i, i + n);
    }
}

const client = Adb.createClient();
/* istanbul ignore next */
const run = async () => {
    try {
        const devices = await client.listDevices();
        if (devices.length === 0) {
            console.error(`Cannot communicate with Evam device. Make sure your device is connected.`)
            return
        }
        if (!fs.existsSync('build/.')) {
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

            const parallelization = 4
            const syncService: Sync[] = []
            for (let i = 0; i < parallelization; i++) {
                syncService.push(await dev.syncService())
            }

            // const sync = await dev.syncService()
            // Push build directory
            // TODO handle better when very many files
            glob("build/**", (er, files) => {
                (async () => {
                    for (const file of chunks(files, parallelization)) {
                        await Bluebird.all(
                            file.map((file, idx) => {
                                if (fs.lstatSync(file).isDirectory()) {
                                    const fileOnDevice = file.replace("build", "")
                                    let targetDir = "www"
                                    if (fileOnDevice.includes("evam.json")) {
                                        targetDir = "meta"
                                    }
                                    console.log(`Pushing ${fileOnDevice}`)
                                    return dev.shell(`mkdir -p /data/local/tmp/life.evam.hydras/dist/${targetDir}/${fileOnDevice}`)
                                } else {
                                    const fileOnDevice = file.replace("build", "")
                                    console.log(`Pushing ${fileOnDevice}`)
                                    let targetDir = "www"
                                    if (fileOnDevice.includes("evam.json")) {
                                        targetDir = "meta"
                                    }

                                    const sync = syncService[idx]
                                    const push = sync.pushFile(file, `/data/local/tmp/life.evam.hydras/dist/${targetDir}/${fileOnDevice}`)
                                    return new Bluebird((resolve, reject) => {
                                        push.on('end', () => {
                                            resolve()
                                        })
                                        push.on("error", (err) => {
                                            reject(err)
                                        })
                                    })
                                }
                            })
                        )
                    }
                })().catch(console.error).finally(() => {
                    syncService.forEach(s => s.end())
                })
            })
        })
    } catch (e) {
        console.error(e)
        reject(e)
    }
}

run()
    .then(() => {
        console.log("")
    })
    .catch((e) => {
        console.error(`Failed: ${e}`)
    })