export interface AndroidInterface {
    toast(): void
    getDeviceList(): string
    hasPermission(productId: number, vendorId: number, serialNumber: string): boolean
    requestPermission(deviceFilterJson: string): string | undefined
    deviceOpen(vendorId: number): string | undefined
    deviceClose(vendorId: number): string | undefined
    deviceClaimInterface(vendorId: number, interfaceNumber: number, force: boolean): string | undefined
    deviceGetInterfaces(vendorId: number): string
    deviceTransferIn(vendorId: number, endpointNumber: number, length: number, timeoutMs: number): string
    deviceTransferOut(vendorId: number, endpointNumber: number, data: string, timeoutMs: number): string
    deviceControlTransferIn(vendorId: number, requestType: string, recipient: string, request: number, value: number, index: number, length: number, timeout: number): string
    deviceControlTransferOut(vendorId: number, requestType: string, recipient: string, request: number, value: number, index: number, data: string, timeout: number): string
}