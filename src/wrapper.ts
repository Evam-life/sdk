import Adb from "@devicefarmer/adbkit";
import Bluebird, {reject} from "bluebird";
import fs from "fs";
import glob from "glob";

const client = Adb.createClient();

/* istanbul ignore next */
const run = async () => {
    try {
        const devices = await client.listDevices();
        if (devices.length == 0){
            console.error("You do not have any connected device!")
            return
        } else {
            console.log("Running...")
        }
        await Bluebird.map(devices, async (device) => {
            const dev = await client.getDevice(device.id)

            // Create development directory on device
            const comCreateDir = await dev.shell("mkdir -p /data/local/tmp/life.evam.hydras/component/")
            await new Bluebird((resolve, reject) => {
                comCreateDir.on('end', () => {
                    console.log("Created local dir")
                    resolve()
                })
                comCreateDir.on('error', (e) => {
                    console.error("Failed to create local dir")
                    reject(e)
                })
            })

            // Push build directory
            if (!fs.existsSync('build/.')){
                console.error("No build directory found, make sure to run 'npm run build'.")
                return
            }
            glob("build/**", (er, files) => {
                files.forEach( async (file) => {
                    if (fs.lstatSync(file).isDirectory()){
                        const fileOnDevice = file.replace("build", "")
                        console.log(`Pushing ${fileOnDevice}`)
                        const comCreateDir = await dev.shell(`mkdir -p /data/local/tmp/life.evam.hydras/dev/${fileOnDevice}`)
                        await new Bluebird((resolve, reject) => {
                            comCreateDir.on('error', (e) => {
                                console.error(`Failed to create ${file}`)
                                reject(e)
                            })
                        })
                    } else {
                        const fileOnDevice = file.replace("build", "")
                        console.log(`Pushing ${fileOnDevice}`)
                        const comPush = await dev.push(file, `/data/local/tmp/life.evam.hydras/dev/${fileOnDevice}`)
                        await new Bluebird((resolve, reject) => {
                            comPush.on('error', (e) => {
                                console.error(`Failed pushing ${file}`)
                                reject(e)
                            })
                        })
                    }
                })
            })

            // Hot reload trigger
            const comHotReload = await dev.shell("echo r >> /data/local/tmp/.evam.stamp.txt")
            await new Bluebird((resolve, reject) => {
                comHotReload.on('error', (e) => {
                    console.error("Failed to hot reload")
                    reject(e)
                })
            })
        })
    } catch (e) {
        console.error(e)
        reject(e)
    }
}

run()
    .then(() => {console.log("Done")})
    .catch((e) => {console.error(`Failed: ${e}`)})