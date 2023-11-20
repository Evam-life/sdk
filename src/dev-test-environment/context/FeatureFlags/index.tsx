import {createContext, useContext} from "react";

type FeatureFlagsContextState = {
    showFullDeviceView: boolean
}

const FeatureFlagsContext = createContext<FeatureFlagsContextState>({
    showFullDeviceView: false
});

const useFeatureFlag = () => useContext(FeatureFlagsContext);

export {
    FeatureFlagsContext,
    useFeatureFlag
};