import {generateId} from "./generateId";
import React from "react";
import mapboxgl from "mapbox-gl";

const deleteLayersById = (map: React.MutableRefObject<mapboxgl.Map>, id: string) => {
    if (!map.current) return;

    let sourceId, layerId, labelLayerId, iconLayerId: string;

    sourceId = generateId("source", id);
    layerId = generateId("layer", id);
    labelLayerId = generateId("label", id);
    iconLayerId = generateId("image", id);

    let index: number = 0;

    do {
        // Remove text label layer
        if (map.current.getLayer(labelLayerId)) map.current.removeLayer(labelLayerId);
        // Remove fill layer
        if (map.current.getLayer(layerId)) map.current.removeLayer(layerId);
        //remove the image layer
        if (map.current.getLayer(iconLayerId)) map.current.removeLayer(iconLayerId);
        // Remove source
        if (map.current.getSource(sourceId)) map.current.removeSource(sourceId);

        sourceId = generateId("source", id, index);
        layerId = generateId("layer", id, index);
        labelLayerId = generateId("label", id, index);
        iconLayerId = generateId("image", id, index);
        index++;

    } while (
        map.current.getLayer(layerId) ||
        map.current.getLayer(labelLayerId) ||
        map.current.getLayer(iconLayerId) ||
        map.current.getSource(sourceId)
        );
};

export default deleteLayersById;