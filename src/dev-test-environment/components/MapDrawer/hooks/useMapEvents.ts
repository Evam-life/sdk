import {useEffect} from "react";
import {subscribe} from "../../../../util/EventHelpers";
import {EvamEvent} from "../../../../domain";
import {unsubscribe} from "../../../util/EventHelpers";

type UseMapEventsProps = {
    onNavLayerDeleted: (e: Event) => void,
    onNavLayerPointSet: (e: Event) => void,
    onNavLayerShapeSet: (e: Event) => void,
}

const useMapEvents = ({
                          onNavLayerDeleted,
                          onNavLayerShapeSet,
                          onNavLayerPointSet
                      }: UseMapEventsProps): void => {
    useEffect(() => {
        subscribe(EvamEvent.NavLayerDeleted, onNavLayerDeleted);
        subscribe(EvamEvent.NavLayerPointSet, onNavLayerPointSet);
        subscribe(EvamEvent.NavLayerShapeSet, onNavLayerShapeSet);
        return () => {
            unsubscribe(EvamEvent.NavLayerDeleted, onNavLayerDeleted);
            unsubscribe(EvamEvent.NavLayerPointSet, onNavLayerPointSet);
            unsubscribe(EvamEvent.NavLayerShapeSet, onNavLayerShapeSet);
        };

    }, [onNavLayerDeleted, onNavLayerPointSet, onNavLayerShapeSet]);
};

export default useMapEvents;