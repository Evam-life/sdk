import {Location} from "./Location";

type LatLon = Omit<Location, 'timestamp'>

type LayerPointData = {
    point: LatLon,
    text: string,
    icon: string
}

type LayerShapeData = {
    point: LatLon,
    points: LatLon[],
    color: string
}

export {LayerShapeData, LayerPointData};