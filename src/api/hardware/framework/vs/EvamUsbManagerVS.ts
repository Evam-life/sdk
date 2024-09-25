
import {
    UsbDevice,
    UsbDeviceFilter,
    UsbInterface,
    UsbManager,
    UsbTransferResult
} from "../../EvamHardwareUsbApi";
import {AndroidInterface} from "./AndroidInterface";
import {mapNativeJsonToUsbDeviceList} from "./mapper/mapNativeJsonToUsbDevice";
import {
    mapNativeJsonToUsbInterfaceList
} from "./mapper/mapNativeJsonToUrbInterfaceList";

export class EvamUsbManagerVS implements UsbManager {

    private readonly android: AndroidInterface

    constructor(android: AndroidInterface) {
        this.android = android
    }

    getDeviceList(): Promise<UsbDevice[]> {
        let deviceListString = this.android.getDeviceList()
        return Promise.resolve(
            mapNativeJsonToUsbDeviceList(this.android, deviceListString)
        );
    }

    hasPermission(device: UsbDevice): Promise<boolean> {
        return Promise.resolve(this.android.hasPermission(
            device.productId || -1,
            device.vendorId || -1,
            device.serialNumber || "invalid"
        ));
    }

    openDevice(device: UsbDevice): Promise<void> {
        return device.open();
    }

    requestPermission(filters: UsbDeviceFilter[], callback: (device: (UsbDevice | undefined), message: string) => void): Promise<void> {
        let response = this.android.requestPermission(JSON.stringify(filters))
        if (response) {
            callback(undefined, response)
        } else {
            window.addEventListener("devicePermission",
                (e) => {
                    // @ts-ignore
                    let vendorId = e.detail.vendorId
                    this.getDeviceList().then((devList) => {
                        let device = devList.filter((dev) => dev.vendorId === vendorId)
                        if (device.length > 0){
                            callback(device[0], `Permission granted`)
                        }

                    })
                }, {once: true})
        }

        return Promise.resolve(undefined);
    }
}

export class UsbDeviceVS implements UsbDevice {
    readonly classCode: number | undefined;
    readonly productId: number | undefined;
    readonly productName: string | undefined;
    readonly protocolCode: number | undefined;
    readonly serialNumber: string | undefined;
    readonly subclassCode: number | undefined;
    readonly vendorId: number | undefined;
    readonly version: string | undefined;

    private android: AndroidInterface

    constructor(android: AndroidInterface, serialNumber: string | undefined, productId: number, productName: string | undefined, vendorId: number, version: string, classCode: number, subclassCode: number, protocolCode: number) {
        this.serialNumber = serialNumber
        this.productId = productId
        this.productName = productName
        this.vendorId = vendorId
        this.version = version
        this.classCode = classCode
        this.subclassCode = subclassCode
        this.protocolCode = protocolCode
        this.android = android
    }

    claimInterface(interfaceNumber: number, force: boolean): Promise<void> {
        let result = this.android.deviceClaimInterface(this.vendorId || -1, interfaceNumber, force)
        if (result === undefined){
            return Promise.resolve(undefined);
        } else {
            throw Error(result)
        }
    }

    close(): Promise<void> {
        let result = this.android.deviceClose(this.vendorId || -1)
        if (result === undefined){
            return Promise.resolve(undefined);
        } else {
            throw Error(result)
        }
    }

    controlTransferIn(requestType: USBRequestType, recipient: USBRecipient, request: number, value: number, index: number, length: number, timeout: number): Promise<UsbTransferResult> {
        let result = this.android.deviceControlTransferIn(
            this.vendorId || -1,
            requestType, recipient,
            request, value,
            index, length, timeout
        )
        return Promise.resolve(JSON.parse(result) as UsbTransferResult);
    }

    controlTransferOut(requestType: USBRequestType, recipient: USBRecipient, request: number, value: number, index: number, data: Uint8Array, timeout: number): Promise<UsbTransferResult> {
        let dataArray = Array.from(data)
        let result = this.android.deviceControlTransferOut(
            this.vendorId || -1,
            requestType, recipient,
            request, value,
            index, JSON.stringify(dataArray), timeout
        )
        return Promise.resolve(JSON.parse(result) as UsbTransferResult);
    }

    forget(): Promise<void> {
        return Promise.resolve(undefined);
    }

    getInterfaces(): UsbInterface[] {
        let interfaceListString = this.android.deviceGetInterfaces(this.vendorId || -1)
        return mapNativeJsonToUsbInterfaceList(interfaceListString)
    }

    open(): Promise<void> {
        let result = this.android.deviceOpen(this.vendorId || -1)
        if (result === undefined){
            return Promise.resolve(undefined);
        } else {
            throw Error(result)
        }
    }

    releaseInterface(interfaceNumber: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    transferIn(endpointNumber: number, length: number, timeout: number): Promise<UsbTransferResult> {
        let result = this.android.deviceTransferIn(this.vendorId || -1, endpointNumber-1, length, timeout)
        return Promise.resolve(JSON.parse(result) as UsbTransferResult);
    }

    transferOut(endpointNumber: number, data: Uint8Array, timeout: number): Promise<UsbTransferResult> {
        let result = this.android.deviceTransferOut(this.vendorId || -1, endpointNumber-1, JSON.stringify(Array.from(data)), timeout)
        return Promise.resolve(JSON.parse(result) as UsbTransferResult);
    }
}