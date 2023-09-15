import {EvamUsbManagerDev} from "./framework/dev/EvamUsbManagerDev";
import {EvamUsbManagerVS} from "./framework/vs/EvamUsbManagerVS";

/**
 * Evam API singleton that exposes methods to interact with the hardware
 * connected to the Evam platform over USB.
 *
 * @example
 * ```ts
 * // Get instance (don't be afraid to copy them around or create more, as they're simply a lightweight reference to shared static data)
 * const evamHwApi = new EvamHardwareUsbApi();
 *
 * // List USB devices the application has access to from the Evam platform
 * let devices = await evamHwApi.usbManager.getDeviceList()
 *
 * // Request access to another device (will show a pop-up to the user)
 * evamHwApi.usbManager.requestPermission(
 *     [{vendorId: 0x403}], // Device filters
 *     (device, msg) => {
 *         console.log(`Permission request result ${msg}`)
 *         // Set up the obtained device [device] if not undefined and store it
 *     })
 *
 * // Open the obtained device, required for further access
 * await device.open()
 *
 * // List all interfaces and endpoints
 * device.getInterfaces().forEach((ifc) => {
 *     // Claim interface to perform transfer operations
 *     device.claimInterface(ifc.interfaceNumber, true).then(() => {
 *         // Example: set baud rate to 38400 in FTDI chip TTL232RG-VSW3V3
 *         device.controlTransferOut("vendor", "device", 0x03, 0xc04e, 48000000, new Uint8Array([]), 0)
 *     })
 *     ifc.endpoints.forEach((endpt) => {
 *         console.log(`Endpoint: ${endpt.endpointNumber} - ${endpt.direction}`)
 *     })
 * })
 *
 * // Write to serial (in this case endpoint 2's direction is 'out')
 * let result = await device.transferOut(2, new TextEncoder().encode("AT\r\n"), 0)
 * console.log(`Bytes written: ${result.length}`)
 *
 * // Read 64 Bytes from serial (in this case endpoint 1's direction is 'in')
 * let result = await device.transferIn(1, 64, 0)
 * let responseText = String.fromCharCode(...result.data)
 * console.log(`Response from serial: ${responseText}`)
 * ```
 */
export class EvamHardwareUsbApi {
    public readonly usbManager: UsbManager

    /**
     * Create new EvamHardwareUsbApi instance, backend framework will be
     * auto-detected (Development environment or Vehicle Services).
     */
    constructor() {
        // @ts-ignore
        if (typeof Android !== "undefined") {
            // @ts-ignore
            this.usbManager = new EvamUsbManagerVS(Android)
        } else {
            this.usbManager = new EvamUsbManagerDev(navigator.usb)
        }
    }
}

/**
 * Usb manager class for the Evam platform, contains general USB device
 * management APIs.
 */
export interface UsbManager {
    /**
     * Checks if a specific device can be accessed from this application
     * @param device The target USB device
     * @return boolean true if application is authorized, false otherwise
     */
    hasPermission(device: UsbDevice): Promise<boolean>

    /**
     * Gets the list of devices the application is allowed (authorized)
     * to communicate with.
     * @return UsbDevice[] List of accessible devices
     */
    getDeviceList(): Promise<UsbDevice[]>

    /**
     * Opens a specific device
     * @param device Device to be opened for communication
     */
    openDevice(device: UsbDevice): Promise<void>

    /**
     * Requests the permission to access a specific device selected from a
     * list of filters. Will cause a system pop-up to be shown to the end user
     * for the device selection.
     * @param filters List of filters for the USB device to be requested
     * @param callback Function to be run when the end user has granted permission to a device. Provides the device and a result message.
     */
    requestPermission(filters: UsbDeviceFilter[], callback: (device: UsbDevice | undefined, message: string) => void): Promise<void>
}

/**
 * Usb device accessible from the Evam platform
 */
export interface UsbDevice {
    /**
     * Device serial number
     */
    readonly serialNumber: string | undefined

    /**
     * Device product ID
     */
    readonly productId: number | undefined

    /**
     * Device product name
     */
    readonly productName: string | undefined

    /**
     * Device vendor ID
     */
    readonly vendorId: number | undefined

    /**
     * Device USB version as "major.minor.sub-minor"
     */
    readonly version: string | undefined

    /**
     * Device class code
     */
    readonly classCode: number | undefined

    /**
     * Device sub class code
     */
    readonly subclassCode: number | undefined

    /**
     * Device protocol code
     */
    readonly protocolCode: number | undefined

    /**
     * Open the device for communication
     */
    open(): Promise<void>

    /**
     * Perform a bulk transfer - IN direction (data read)
     * @param endpointNumber The endpoint number to be targeted
     * @param length The transfer length
     * @param timeout The timeout in milliseconds
     */
    transferIn(endpointNumber: number, length: number, timeout: number): Promise<UsbTransferResult>

    /**
     * Perform a bulk transfer - OUT direction (data write)
     * @param endpointNumber The endpoint number to be targeted
     * @param data The data bytes to be written
     * @param timeout The timeout in milliseconds
     */
    transferOut(endpointNumber: number, data: Uint8Array, timeout: number): Promise<UsbTransferResult>

    /**
     * Perform a control transfer - IN direction (data read)
     * @param requestType The request type: "standard", "class" or "vendor"
     * @param recipient The recipient: "device" | "interface" | "endpoint" | "other"
     * @param request The request byte
     * @param value The value byte
     * @param index The index for the request
     * @param length The request length
     * @param timeout timeout in milliseconds
     */
    controlTransferIn(requestType: USBRequestType, recipient: USBRecipient, request: number, value: number, index: number, length: number, timeout: number): Promise<UsbTransferResult>

    /**
     * Perform a control transfer - OUT direction (data write)
     * @param requestType The request type: "standard", "class" or "vendor"
     * @param recipient The recipient: "device" | "interface" | "endpoint" | "other"
     * @param request The request byte
     * @param value The value byte
     * @param index The index for the request
     * @param data The data to be written
     * @param timeout The timeout in milliseconds
     */
    controlTransferOut(requestType: USBRequestType, recipient: USBRecipient, request: number, value: number, index: number, data: Uint8Array, timeout: number): Promise<UsbTransferResult>

    /**
     * Get the interfaces this device has
     */
    getInterfaces(): UsbInterface[]

    /**
     * Claims an interface by its number for exclusive communication access
     * @param interfaceNumber The interface number from [UsbInterface]
     * @param force Set to true to make an attempt at enforcing the claim
     */
    claimInterface(interfaceNumber: number, force: boolean): Promise<void>

    /**
     * Release an interface once communication is no longer needed
     * @param interfaceNumber The interface number from [UsbInterface]
     */
    releaseInterface(interfaceNumber: number): Promise<void>

    /**
     * Close a device once it is no longer needed
     */
    close(): Promise<void>

    /**
     * Release the authorization for this device, access will have to
     * be requested again.
     */
    forget(): Promise<void>
}

export interface UsbDeviceFilter {
    /**
     * Device vendor ID
     */
    vendorId?: number | undefined

    /**
     * Device product ID
     */
    productId?: number | undefined

    /**
     * Device class code
     */
    classCode?: number | undefined

    /**
     * Device sub class code
     */
    subclassCode?: number | undefined

    /**
     * Device protocol code
     */
    protocolCode?: number | undefined

    /**
     * @deprecated
     * Device serial number, avoid using this in the filter as it may not
     * always be possible to the read the serial number before obtaining
     * access to the device. In that case this filter value will be ignored.
     */
    serialNumber?: string | undefined
}

/**
 * The result of a USB transfer operation
 */
export interface UsbTransferResult {
    /**
     * The received data bytes (if read operation)
     */
    data: number[]
    /**
     * The status message: "ok" or some error message
     */
    status: string
    /**
     * The number of bytes read or written
     */
    length: number
}

/**
 * A USB interface exposed by a device
 */
export interface UsbInterface {
    /**
     * The interface number
     */
    interfaceNumber: number
    /**
     * The available endpoints
     */
    endpoints: UsbEndpoint[]
}

/**
 * A USB endpoint available for communication
 */
export interface UsbEndpoint {
    /**
     * The endpoint number
     */
    endpointNumber: number
    /**
     * The endpoint direction: "in" (device->host) or "out" (host->device)
     */
    direction: string
    /**
     * The maximum allowed packet size in Bytes
     */
    packetSize: number
}