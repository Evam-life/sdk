class PhoneCall {
    constructor(
        public callId: string,
        public  callNumber: string,
        public  callState: string
    ) {}

    static fromJSON(data: any) {
        return new PhoneCall(data.callId, data.callNumber, data.callState);
    }
}

export { PhoneCall }