interface AndroidMethodArgumentMap {
    sendNotification: readonly [string],
    apiReady: readonly [],
    setItem: readonly [string, string],
    getItem: readonly [string],
    deleteItem: readonly [string],
    clearItems: readonly [],
    setHospital: readonly [number],
    setPriority: readonly [number],
    setNavLayerPoint: readonly [string, string],
    setNavLayerShape: readonly [string, string],
    deleteNavLayer: readonly [string]
}

export {
    AndroidMethodArgumentMap
};