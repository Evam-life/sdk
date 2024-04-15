import { PhoneCallState } from "./PhoneCallState";
import { CallDisconnectCause } from "./CallDisconnectCause";


class PhoneCall {

    /**
     * Model class for the phone call.
     * @param callId the unique id of the call 
     * @param callNumber the phone number that the call is connecting to
     * @param callState the state of the call. See {@link PhoneCallState}
     * @param disconnectCause The cause of the termination of a call. See {@link CallDisconnectCause}.
     */
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