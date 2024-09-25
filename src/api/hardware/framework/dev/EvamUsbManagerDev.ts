import {
    UsbDevice,
    UsbDeviceFilter,
    UsbInterface,
    UsbManager,
    UsbTransferResult
} from "../../EvamHardwareUsbApi";

export class EvamUsbManagerDev implements UsbManager {
    private usb: USB
    constructor(usb: USB) {
        this.usb = usb
    }

    private mapUSBDeviceToUsbDevice(dev: USBDevice): UsbDevice {
        return new UsbDeviceDev(
            this.usb,
            dev,
            dev.serialNumber,
            dev.productId,
            dev.productName,
            dev.vendorId,
            `${dev.usbVersionMajor}.${dev.usbVersionMinor}.${dev.usbVersionSubminor}`,
            dev.deviceClass,
            dev.deviceSubclass,
            dev.deviceProtocol
        )
    }

    async getDeviceList(): Promise<UsbDevice[]> {
        let devices = await this.usb.getDevices()
        return devices.map((dev: USBDevice) => this.mapUSBDeviceToUsbDevice(dev))
    }

    async hasPermission(device: UsbDevice): Promise<boolean> {
        let devices = await this.getDeviceList()
        return devices.filter((dev) => {
            return dev.vendorId === device.vendorId
                && dev.productName === device.productName
                && dev.productId === device.productId
                && dev.serialNumber === device.serialNumber
        }).length > 0;
    }

    async openDevice(device: UsbDevice): Promise<void> {
        await device.open()
    }

    async requestPermission(filters: UsbDeviceFilter[], callback: (device: (UsbDevice | undefined), message: string) => void): Promise<void> {
        this.usb.requestDevice({
            filters: filters
        }).then((dev) => {
            callback(this.mapUSBDeviceToUsbDevice(dev), "Success")
        }).catch((err) => {
            callback(undefined, `Error: ${err}`)
        })
    }

}

export class UsbDeviceDev implements UsbDevice {

    private usb: USB
    private dev: USBDevice

    readonly classCode: number | undefined;
    readonly productId: number | undefined;
    readonly productName: string | undefined;
    readonly protocolCode: number | undefined;
    readonly serialNumber: string | undefined;
    readonly subclassCode: number | undefined;
    readonly vendorId: number | undefined;
    readonly version: string | undefined;

    constructor(usb: USB, dev: USBDevice, serialNumber: string | undefined, productId: number, productName: string | undefined, vendorId: number, version: string, classCode: number, subclassCode: number, protocolCode: number) {
        this.serialNumber = serialNumber
        this.productId = productId
        this.productName = productName
        this.vendorId = vendorId
        this.version = version
        this.classCode = classCode
        this.subclassCode = subclassCode
        this.protocolCode = protocolCode
        this.usb = usb
        this.dev = dev
    }

    private mapUSBTransferInResultToUsbTransferResult(result: USBInTransferResult): UsbTransferResult {
        let data: number[] = []
        console.log(`Offset: ${result.data?.byteOffset}, Length: ${result.data?.byteLength}`)
        if (result.data !== undefined){
            for (let i=result.data.byteOffset; i<result.data.byteLength; i++){
                data.push(result.data.getInt8(i))
            }
        }

        return {data: data, status: result.status || "Unknown", length: data.length}
    }

    private mapUSBInterfaceToUsbInterface(inf: USBInterface): UsbInterface {
        return {
            interfaceNumber: inf.interfaceNumber,
            endpoints: inf.alternate.endpoints
        }
    }

    async claimInterface(interfaceNumber: number, force: boolean): Promise<void> {
        await this.dev.claimInterface(interfaceNumber)
    }

    async close(): Promise<void> {
        await this.dev.close()
    }

    async controlTransferIn(requestType: USBRequestType, recipient: USBRecipient, request: number, value: number, index: number, length: number, timeout: number): Promise<UsbTransferResult> {
        let result = await this.dev.controlTransferIn({
            requestType: requestType,
            recipient: recipient,
            request: request,
            value: value,
            index: index
        }, length)
        return this.mapUSBTransferInResultToUsbTransferResult(result)
    }

    async controlTransferOut(requestType: USBRequestType, recipient: USBRecipient, request: number, value: number, index: number, data: Uint8Array, timeout: number): Promise<UsbTransferResult> {
        let result = await this.dev.controlTransferOut({
            requestType: requestType,
            recipient: recipient,
            request: request,
            value: value,
            index: index
        }, data)
        let out = this.mapUSBTransferInResultToUsbTransferResult(result)
        out.length = result.bytesWritten
        return out
    }

    async forget(): Promise<void> {
        await this.dev.forget()
    }

    getInterfaces(): UsbInterface[] {
        let interfaces = this.dev.configuration?.interfaces || []
        return interfaces.map((inf) => this.mapUSBInterfaceToUsbInterface(inf))
    }

    async releaseInterface(interfaceNumber: number): Promise<void> {
        await this.dev.releaseInterface(interfaceNumber)
    }

    async transferIn(endpointNumber: number, length: number, timeout: number): Promise<UsbTransferResult> {
        let result = await this.dev.transferIn(endpointNumber, length)
        return this.mapUSBTransferInResultToUsbTransferResult(result)
    }

    async transferOut(endpointNumber: number, data: Uint8Array, timeout: number): Promise<UsbTransferResult> {
        let result = await this.dev.transferOut(endpointNumber, data)

        let out = this.mapUSBTransferInResultToUsbTransferResult(result)
        out.length = result.bytesWritten
        return out
    }

    async open(): Promise<void> {
        await this.dev.open()
    }

}