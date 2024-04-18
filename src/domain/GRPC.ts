class GRPC {
    /**
     * Provides information about the gRPC proxy address within Vehicle Services to bind to for usage of gRPC-web.
     *
     * @param address The internal proxy address for gRPC usage
     */
    constructor(public address: string | undefined) {
    }

}

export {GRPC}