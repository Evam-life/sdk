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
        const phoneCallState: PhoneCallState = PhoneCallState[data.callState as keyof typeof PhoneCallState] === undefined ? PhoneCallState.UNKNOWN : PhoneCallState[data.callState as keyof typeof PhoneCallState]
       
        const disconnectCause: CallDisconnectCause = CallDisconnectCause[data.disconnectCause as keyof typeof CallDisconnectCause] === undefined ? CallDisconnectCause.UNKNOWN : CallDisconnectCause[data.disconnectCause as keyof typeof CallDisconnectCause]

        return new PhoneCall(data.callId, data.callNumber, phoneCallState, disconnectCause);
    }}

export { PhoneCall }