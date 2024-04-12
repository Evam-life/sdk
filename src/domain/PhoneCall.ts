import { PhoneCallState } from "./PhoneCallState";
import { CallDisconnectCause } from "./CallDisconnectCause";


class PhoneCall {
    constructor(
        public callId: string,
        public callNumber: string,
        public callState: PhoneCallState,
        public disconnectCause: CallDisconnectCause | undefined
    ) {}

    static fromJSON(data: any) {
        let phoneCallState: PhoneCallState;
        try {
            phoneCallState = PhoneCallState[data.callState as keyof typeof PhoneCallState];
        } catch (e) {
            console.error("Unknown phone call state: " + data.callState);
            phoneCallState = PhoneCallState.UNKNOWN;
        }

        let disconnectCause: CallDisconnectCause;

        if (disconnectCause !== undefined) {
            try {
                disconnectCause = CallDisconnectCause[data.disconnectCause as keyof typeof CallDisconnectCause];
            } catch (e) {
                console.error("Unknown disconnect cause: " + data.disconnectCause);
                disconnectCause = CallDisconnectCause.UNKNOWN
            }
        }

        return new PhoneCall(data.callId, data.callNumber, phoneCallState, disconnectCause);
    }}

export { PhoneCall }