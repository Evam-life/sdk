export const vehicleStatus = {
    name: 59.3538975,
    event: 17.9721877,
    successorName: "test",
    isStartStatus: true,
    isEndStatus: true,
    categoryType: "test",
    categoryName: "test",
};

export const op = {
    operationID: "56",
    patientName: "Test Testkort",
    patientUID: "900608-2381",
    callCenterId: "18",
    caseFolderId: "1",
    prio: "PRIO 1",
    vehicleStatus,
    destinationSiteLocation: {
        latitude: 59.35393,
        longitude: 17.973795,
        street: "Vretenvägen 13"
    },
    name: "Brand i bilen",
    sendTime: (new Date()).getTime() / 1000,
    createdTime: (new Date()).getTime() / 1000,
};

export const destinationControlPointLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    name: 'dpcl',
    additionalInfo: 'test'
}

export const destinationSiteLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    street: 'test',
    locality: 'test',
    municipality:'test',
    routeDirections:'test',
    pickupTime:'test'
}

export const hospitalLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    id: 'test',
    name:'test',
    street1:'test',
    city:'test',
    region:'test',
    postalCode:'test'
}

export const location = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    timestamp: new Date(0).getTime()
}

export const operationPriority = {
    name: 'test',
    id: 'test',
}

export const patient = {
    name: 'test',
    uid: 'test',
}

export const systemHealth = {
    isHealthy: true,
    message: 'test',
    timestamp: new Date(0).getTime(),
}

export const vehicleLocation = {
    latitude: 59.3538975,
    longitude: 17.9721877,
    timestamp: new Date(0).getTime()
}

export const vehicleState = {
    timestamp: new Date(0).getTime(),
    vehicleStatus,
    activeCaseFullId: 'test',
    vehicleLocation,
}