import {Feature, Geometry, Position} from "geojson";
import {LayerPointData, LayerShapeData} from "../../../../../../domain/LayerData";
import mapboxgl from "mapbox-gl";

const generateImageLayout = (imageId: string): mapboxgl.SymbolLayout => ({
    "text-field": ["get", "feature-text"],
    "text-allow-overlap": false,
    "text-ignore-placement": false,
    "text-anchor": "top",
    "icon-anchor": "bottom",
    "icon-image": imageId,
    "text-size": 14
});


const imagePaintStyle: mapboxgl.SymbolPaint = {
    "text-color": "#000",
    "text-halo-color": "#fff",
    "text-halo-width": 1,
    "text-halo-blur": 0
};

const generateImageLayer = (layerId: string, sourceId: string, imageId: string): mapboxgl.SymbolLayer => ({
    id: layerId,
    "type": "symbol",
    "source": sourceId,
    "layout": generateImageLayout(imageId),
    "paint": imagePaintStyle
});

const generateTextLayer = (labelId: string, sourceId: string): mapboxgl.SymbolLayer => ({
    id: labelId,
    type: "symbol",
    source: sourceId,
    layout: {
        "text-field": ["get", "feature-text"],
        "text-size": 12,
        "text-anchor": "center",
        "text-justify": "center",
        "text-offset": [0, 0.5] // Adjust the offset to position the text above the shape
    },
    paint: {
        "text-color": "#000000"
    }
});

const generateFillLayer = (layerId: string, sourceId: string): mapboxgl.FillLayer => ({
    id: layerId,
    "type": "fill",
    "source": sourceId,
    "paint": {
        "fill-color": ["get", "fill-color"],
        "fill-opacity": 0.8,
    },
});

const generatePointsNavLayerGeoJsonFeatures = (layerDataArray: Array<LayerPointData>) => layerDataArray.map<Feature<Geometry, {
    [p: string]: any
}>>(({
         point: {
             longitude,
             latitude
         }, icon, text
     }) => {
    return {
        type: "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [longitude, latitude]
        },
        properties: {
            "feature-text": text
        }
    };
});

const generateShapeNavLayerGeoJsonFeatures = (layerDataArray: Array<LayerShapeData>) => layerDataArray.map<Feature<Geometry, {
    [p: string]: any
}>>(({
         text,
         points,
         color
     }) => {

    const coordinates = [points.map<Position>(({
                                                   longitude,
                                                   latitude
                                               }) => [
        longitude,
        latitude
    ])];

    return {
        type: "Feature",
        properties: {
            "fill-color": color,
            "feature-text": text
        },
        geometry: {
            coordinates,
            type: "Polygon"
        }
    };
});


const generateGeoJsonPointsLayerFromFeatures = (geoJsonFeatures: Array<Feature<Geometry, {
    [p: string]: any
}>>): mapboxgl.AnySourceData => (
    {
        type: "geojson",
        data: {
            "type": "FeatureCollection",
            "features": geoJsonFeatures,
        }
    }
);

export {
    generateImageLayout,
    generateImageLayer,
    generateTextLayer,
    generateFillLayer,
    generatePointsNavLayerGeoJsonFeatures,
    generateShapeNavLayerGeoJsonFeatures,
    generateGeoJsonPointsLayerFromFeatures,
    imagePaintStyle
};