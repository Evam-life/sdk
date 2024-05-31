import {AudioDevicesType} from "./AudioDevicesType";

class AudioDevices {


    /**
     * Class representing the payload for event NewOrUpdatedAudioDeviceTypes.
     * @param availableTypes the available types of audio devices for phone calls
     * @param selectedType the selected audio device type for phone calls.
     */
    constructor(
        public availableTypes: AudioDevicesType[],
        public selectedType: AudioDevicesType
    ) {
    }

    static fromJSON(audioDevices: any): AudioDevices {

        const selectedType = AudioDevicesType[audioDevices.selectedType as keyof typeof AudioDevicesType];
        if (selectedType === undefined) {
            throw Error("Invalid audio device type in fromJSON for audio devices")
        }


        let availableTypes: AudioDevicesType[];
        const availableTypesList = audioDevices.availableTypes
        if (Array.isArray(availableTypesList)) {
            availableTypes = availableTypesList.map<AudioDevicesType>((type) => {
                const audioType = AudioDevicesType[type as keyof typeof AudioDevicesType];
                if (audioType === null) {
                    throw Error("Invalid audio device type in fromJSON for audio devices");
                }
                return audioType
            })
        } else {
            throw Error("Available audio devices types is not an array")
        }


        return new AudioDevices(
            availableTypes,
            selectedType
        )
    }

}

export {AudioDevices};