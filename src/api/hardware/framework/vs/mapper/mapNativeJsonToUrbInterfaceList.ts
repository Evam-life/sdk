import {UsbInterface} from "../../../EvamHardwareUsbApi";

export function mapNativeJsonToUsbInterfaceList(json: string): UsbInterface[] {
    return JSON.parse(json) as UsbInterface[]
}