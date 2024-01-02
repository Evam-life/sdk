interface AndroidMiscMethodNameSignatureMap {
  apiReady: () => void;
}

interface AndroidRakelMethodNameSignatureMap {
  sendRawRakelAction: (action: string) => void;
}

interface AndroidOperationMethodNameSignatureMap {
  setPriority: (id: number) => void;
  setHospital: (id: number) => void;
}

interface AndroidMapsMethodNameSignatureMap {
  setNavLayerPoint: (id: string, layerPointData: string) => void;
  setNavLayerShape: (id: string, layerShapeData: string) => void;
  deleteNavLayer: (id: string) => void;
}

interface AndroidNotificationMethodNameSignatureMap {
  sendNotification: (notification: string) => void;
  removeNotification: (notificationId: string) => void;
}

interface AndroidAppMethodNameSignatureMap {
  putAppInForeground: () => void;
}

/**
 * An interface which maps an AndroidEvent to its function signature.
 * This is for compile-time typechecking and must be synchronised with Vehicle Services.
 *
 * IMPORTANT when adding new methods in future keep in mind all parameters must be serialised to primitives.
 * Any method signature which contains parameter types not of type string | number | boolean will not be
 * valid AndroidMethod types.
 * @see AndroidMethod
 */
export interface AndroidMethodNameSignatureMap
  extends AndroidMiscMethodNameSignatureMap,
    AndroidRakelMethodNameSignatureMap,
    AndroidOperationMethodNameSignatureMap,
    AndroidMapsMethodNameSignatureMap,
    AndroidAppMethodNameSignatureMap,
    AndroidNotificationMethodNameSignatureMap {}
