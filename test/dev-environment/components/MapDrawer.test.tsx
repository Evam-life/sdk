import React, {useRef} from "react";
import "@testing-library/jest-dom";
import {act, renderHook} from "@testing-library/react";
import useMapEvents from "../../../src/dev-test-environment/components/MapDrawer/hooks/useMapEvents";
import {publish} from "../../../src/util/EventHelpers";
import {EvamEvent} from "../../../src";
import "@testing-library/jest-dom";
import mapboxgl from "mapbox-gl";
import deleteLayersById from "../../../src/dev-test-environment/components/MapDrawer/utils/deleteLayersById";
import {generateFillLayer} from "../../../src/dev-test-environment/components/MapDrawer/data/layer/style/layerLayout";

const getLayerMock = jest.fn();
const removeLayerMock = jest.fn();
const getSourceMock = jest.fn();
const removeSourceMock = jest.fn();
const addLayerMock = jest.fn();


jest.mock("mapbox-gl", () => ({
    ...jest.requireActual("mapbox-gl"),
    Map: jest.fn(() => ({
        getLayer: getLayerMock,
        removeLayer: removeLayerMock,
        getSource: getSourceMock,
        removeSource: removeSourceMock,
        addLayer: addLayerMock
        // Add other methods you want to spy on here
    })),
}));

// Mock mapboxgl and its methods
describe("useMapEvents", () => {

    it("should trigger the callbacks based on the appropriate events", () => {

        const layerPointSetMock = jest.fn();
        const layerShapeSetMock = jest.fn();
        const deleteLayerMock = jest.fn();

        renderHook(() => useMapEvents({
            onNavLayerPointSet: layerPointSetMock,
            onNavLayerShapeSet: layerShapeSetMock,
            onNavLayerDeleted: deleteLayerMock
        }));

        expect(layerPointSetMock).not.toHaveBeenCalled();
        expect(layerShapeSetMock).not.toHaveBeenCalled();
        expect(deleteLayerMock).not.toHaveBeenCalled();

        publish(EvamEvent.NavLayerPointSet, {});
        publish(EvamEvent.NavLayerDeleted, {});
        publish(EvamEvent.NavLayerShapeSet, {});

        expect(layerPointSetMock).toHaveBeenCalled();
        expect(layerShapeSetMock).toHaveBeenCalled();
        expect(deleteLayerMock).toHaveBeenCalled();

    });
});

//TODO we need to test deleteLayersById