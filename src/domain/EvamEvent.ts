/**
 * Event names for events specific to Vehicle Services.
 * All names are self-explanatory (_testEvent is specifically for testing purposes and is not used in the sdk or Vehicle Services)
 */
enum EvamEvent {
    NewOrUpdatedOperation = "newOrUpdatedOperation",
    NewOrUpdatedSettings = "newOrUpdatedSettings",
    NewOrUpdatedInternetState = "newOrUpdatedInternetState",
    NewOrUpdatedDeviceRoles = "newOrUpdatedDeviceRoles",
    NewOrUpdatedLocation = "newOrUpdatedLocation",
    NewOrUpdatedVehicleState = "newOrUpdatedVehicleState",
    NewOrUpdatedTripLocationHistory = "newOrUpdatedTripLocationHistory",
    NewOrUpdateRakelState = "newOrUpdateRakelState",
    NewOrUpdatedAvailableVehicleStatusList = "newOrUpdatedAvailableVehicleStatusList",
    VehicleServicesNotificationSent = "vehicleServicesNotificationSent",
    VehicleServicesNotificationCallbackTriggered = "vehicleServicesNotificationCallbackTriggered",
    GRPCEstablished = "gRPCEstablished",
    NewOrUpdatedOperationList = "newOrUpdatedOperationList",
    NewOrUpdatedBattery = "newOrUpdatedBattery",
    NewOrUpdatedDisplayMode = "newOrUpdatedDisplayMode",
    OSVersionSet = "osVersionSet",
    VehicleServicesVersionSet = "vehicleServicesVersionSet",
    AppVersionSet = "appVersionSet",
    DeviceIdSet = "deviceIdSet",
    AppIdSet = "appIdSet",
    NavLayerPointSet = "navLayerPointSet",
    NavLayerShapeSet = "navLayerShapeSet",
    NavLayerDeleted = "navLayerDeleted",
    RawRakelActionSent = "rawRakelActionSent",
    NewOrUpdatedRakelMessages = "newOrUpdatedRakelMessages",
    RemoveNotification = "removeNotification",
    MakeCall = "makeCall",
    AnswerCall = "answerCall",
    HangUpCall = "hangUpCall",
    HoldCall = "holdCall",
    UnholdCall = "unholdCall",
    MuteMicrophone = "muteMicrophone",
    UnmuteMicrophone = "unmuteMicrophone",
    NewOrUpdatedCalls = "newOrUpdatedCalls",
    NewOrUpdatedMuteState = "newOrUpdatedMuteState",
    _testEvent = "_testEvent"
}


export {EvamEvent};
