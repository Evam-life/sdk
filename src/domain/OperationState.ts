enum OperationState {
    /** The Operation is currently active for this vehicle **/
    ACTIVE = "ACTIVE",
    /** The Operation is not currently active for this vehicle, but can become active if the user selects it **/
    AVAILABLE = "AVAILABLE",
    /** The Operation is complete **/
    COMPLETE = "COMPLETE"
}

export {OperationState};