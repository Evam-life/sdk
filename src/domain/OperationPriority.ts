class OperationPriority {
    /**
     * Selectable operation priority
     * @param id id of the priority
     * @param name name of the priority
     */
    constructor(
        public id: number,
        public name: string
    ) {
    }

    /**
     * Create from JSON
     * @param operationPriority JSON object
     */
    static fromJSON(operationPriority: any) {
        if(operationPriority.name === undefined || operationPriority.id === undefined){
            throw Error('name and uid must be declared in Patient')
        }
        return new OperationPriority(
            operationPriority.id,
            operationPriority.name
        );
    }
}

export {OperationPriority};