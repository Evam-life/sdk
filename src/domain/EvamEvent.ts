/**
 * Event names for events specific to Vehicle Services.
 * All names are self-explanatory (_testEvent is specifically for testing purposes and is not used in the sdk or Vehicle Services)
 */
enum EvamEvent {
    NewOrUpdatedOperation = "newOrUpdatedOperation",
    NewOrUpdatedSettings = "newOrUpdatedSettings",
    NewOrUpdatedInternetState = "newOrUpdatedInternetState",
    NewOrUpdatedDeviceRole = "newOrUpdatedDeviceRoles",
    NewOrUpdatedLocation = "newOrUpdatedLocation",
    NewOrUpdatedVehicleState = "newOrUpdatedVehicleState",
    NewOrUpdatedTripLocationHistory = "newOrUpdatedTripLocationHistory",
    VehicleServicesNotificationSent = "vehicleServicesNotificationSent",
    VehicleServicesNotificationCallbackTriggered = "vehicleServicesNotificationCallbackTriggered",
    NewOrUpdatedOperationList = "newOrUpdatedOperationList",
    NewOrUpdatedBattery = "newOrUpdatedBattery",
    OSVersionSet = "osVersionSet",
    VehicleServicesVersionSet = "vehicleServicesVersionSet",
    AppVersionSet = "appVersionSet",
    DeviceIdSet = "deviceIdSet",
    _testEvent = "_testEvent"
}

export {EvamEvent};