import {FC, useCallback, useEffect, useRef, useState} from "react";
import {Box} from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";
import {LayerPointData, LayerShapeData} from "../../../domain/LayerData";
import {generateIds} from "./utils/generateId";
import deleteLayersById from "./utils/deleteLayersById";
import {
    generateFillLayer,
    generateGeoJsonPointsLayerFromFeatures,
    generateImageLayer,
    generatePointsNavLayerGeoJsonFeatures,
    generateShapeNavLayerGeoJsonFeatures,
    generateTextLayer
} from "./data/layer/style/layerLayout";
import MapComponent from "./MapComponent";
import useMapEvents from "./hooks/useMapEvents";

mapboxgl.accessToken = "pk.eyJ1Ijoia2Fpbi1ldmFtIiwiYSI6ImNsb3lhczE5eDAyMDIya2xtcHFwczFlZTgifQ.arDGvCMwYNu80PElCsm7sQ"; //TODO fix this before merge

const MapDrawer: FC = () => {

    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(17.972534);
    const [lat, setLat] = useState(59.352032);
    const [zoom, setZoom] = useState(7);

    const deleteAllLayersById = useCallback((id: string) => deleteLayersById(map, id), []);

    const handleNavLayerDeleted: EventListenerOrEventListenerObject = useCallback((e: Event) => {
        if (map.current) {
            const id = (e as CustomEvent).detail;
            if (typeof id === "string") deleteAllLayersById(id);
        }
    }, [deleteAllLayersById]);

    const handleNavLayerShapeSet: EventListenerOrEventListenerObject = useCallback((e: Event) => {
        if (map.current) {
            const detail = (e as CustomEvent).detail;
            if (detail === undefined) return;
            const id = detail.id;
            const layerData = detail.layerData;
            //validate data
            if (typeof id === "string" && Array.isArray(layerData)) {
                deleteAllLayersById(id);
                const layerDataArray = layerData as Array<LayerShapeData>;
                const geoJsonFeatureCollection = generateShapeNavLayerGeoJsonFeatures(layerDataArray);

                geoJsonFeatureCollection.forEach((geoJsonFeature, index) => {

                    const {
                        sourceId,
                        layerId,
                        labelId
                    } = generateIds(id, index);

                    const geojson: mapboxgl.AnySourceData = {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: [geoJsonFeature]
                        }
                    };
                    map.current.addSource(sourceId, geojson);
                    map.current.addLayer(generateFillLayer(layerId, sourceId));
                    // Add text label
                    map.current.addLayer(generateTextLayer(labelId, sourceId));

                });

            }
        }
    }, [deleteAllLayersById]);

    const handleNavLayerPointSet: EventListenerOrEventListenerObject = useCallback((e: Event) => {
        if (map.current) {
            const detail = (e as CustomEvent).detail;
            if (detail === undefined) return;
            const id = detail.id;
            const layerData = detail.layerData;
            //validate data
            if (typeof id === "string" && Array.isArray(layerData)) {
                deleteAllLayersById(id);
                const layerDataArray = layerData as Array<LayerPointData>;

                const geojsonFeatures = generatePointsNavLayerGeoJsonFeatures(layerDataArray);
                const geojson = generateGeoJsonPointsLayerFromFeatures(geojsonFeatures);

                map.current.loadImage(layerDataArray.at(0).icon, (error, image) => {
                    if (error) throw error;
                    const {imageId, sourceId, layerId} = generateIds(id);
                    map.current.addImage(imageId, image);
                    map.current.addSource(sourceId, geojson);
                    map.current.addLayer(generateImageLayer(layerId, sourceId, imageId));
                });

            }
        }
    }, [deleteAllLayersById])

    useMapEvents({
        onNavLayerPointSet: handleNavLayerPointSet,
        onNavLayerDeleted: handleNavLayerDeleted,
        onNavLayerShapeSet: handleNavLayerShapeSet
    })

    useEffect(() => {
        if (map.current) return;
        /**
         This timeout is here because the Mapbox tutorial for React is slightly wrong.
         The reason is that once we get to this line there's no way to know that mapContainer.current !== null
         and if it is equal to null then setting it as the container will throw an error.

         4000ms should be sufficient time for the div to mount and mapContainer.current to be of the right type.
         It's a "bodged" approach, but should work for now.

         Just because this useEffect has no dependencies doesn't mean it will trigger when ref value updates. Refs
         do not cause re-rendering.
         */
        const id = setTimeout(() => {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [lng, lat],
                zoom: zoom
            });

            map.current.on("zoomend", (d) => {
                setZoom(parseInt(d.target.getZoom().toString()));
            });

            map.current.on("moveend", (d) => {
                setLat(d.target.getCenter().lat);
                setLng(d.target.getCenter().lng);
            });
        }, 4000)
        return () => clearTimeout(id);
    });

    return <Box pos={"fixed"}
                opacity={0.76}
                _hover={{
                    opacity: 1
                }}
                right={4}
                bottom={4}>
        <MapComponent ref={mapContainer} style={{
            height: "500px",
            width: "40vh"
        }}/>
    </Box>;
};

export default MapDrawer;