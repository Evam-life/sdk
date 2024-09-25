class CanbusFrame {
    constructor(
        /** frame ID as bytes **/
        public frameID: number[],
        /** data content as bytes **/
        public frameData: number[],
        /** timestamp in milliseconds since Epoch **/
        public timestamp: number
    ) {}

    static fromJson(data: any) {
        return new CanbusFrame(data.frameID, data.frameData, data.timestamp);
    }

}

export {CanbusFrame};