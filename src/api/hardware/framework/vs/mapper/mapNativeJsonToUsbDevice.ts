import {AndroidInterface} from "../AndroidInterface";
import {UsbDevice} from "../../../EvamHardwareUsbApi";
import {UsbDeviceVS} from "../EvamUsbManagerVS";

export function mapNativeJsonToUsbDeviceList(android: AndroidInterface, json: string): UsbDevice[] {
    let parsedList = JSON.parse(json) as UsbDevice[]

    return parsedList.map((parsed) => {
        return new UsbDeviceVS(
            android,
            parsed.serialNumber,
            parsed.productId || -1,
            parsed.productName,
            parsed.vendorId || -1,
            parsed.version || "",
            parsed.classCode || -1,
            parsed.subclassCode || -1,
            parsed.protocolCode || -1
        )
    })
}
