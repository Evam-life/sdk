let settings = [
    {"id":"debug","name":"Debug mode","description":"Enable debug mode by displaying logs on screen","value":{"default":false}},
    {"id":"debug2","name":"Debug mode","description":"Enable debug mode by displaying logs on screen","value":{"default":false, "value": true}},
]

let out = {}
for (let setting of settings){
    let value = setting.value["value"] ? setting.value["value"] : setting.value.default
    out[setting.id] = value
}

console.log(JSON.stringify(out))