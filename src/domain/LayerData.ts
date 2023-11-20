import {Location} from "./Location";

type LatLon = {
    latitude: number,
    longitude: number
}

type LayerPointData = {
    point: LatLon,
    text: string,
    icon: string
}

type LayerShapeData = {
    points: LatLon[],
    text: string,
    color: string
}

export {LayerShapeData, LayerPointData};