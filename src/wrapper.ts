import Adb from '@devicefarmer/adbkit';
import Bluebird, {reject} from 'bluebird';
import fs from 'fs'

const client = Adb.createClient();
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
            const comCreateDir = await dev.shell("mkdir -p /data/local/tmp/life.evam.hydras/dev/")
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
            const comPush = await dev.push('build/.', '/data/local/tmp/life.evam.hydras/dev/')
            await new Bluebird((resolve, reject) => {
                comPush.on('end', () => {
                    console.log("Pushed build to Evam")
                    resolve()
                })
                comPush.on('error', (e) => {
                    console.error("Failed pushing build to Evam")
                    reject(e)
                })
            })

            // Hot reload trigger
            const comHotReload = await dev.shell("echo r >> /data/local/tmp/.evam.stamp.txt")
            await new Bluebird((resolve, reject) => {
                comHotReload.on('end', () => {
                    console.log("Created local dir")
                    resolve()
                })
                comHotReload.on('error', (e) => {
                    console.error("Failed to create local dir")
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