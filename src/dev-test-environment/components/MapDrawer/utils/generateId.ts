import {capitalize} from "lodash";

const generateId = (type: "source" | "layer" | "label" | "image", id: string, index?: number): string => {
    const userSourceString = `user${capitalize(type)}`;
    const toJoin: Array<string> = [userSourceString, id];
    if (index !== undefined) toJoin.push(index.toString());
    return toJoin.join("-");
};

const generateIds = (id: string, index?: number) => {

    const sourceId = generateId("source", id, index);
    const layerId = generateId("layer", id, index);
    const labelId = generateId("label", id, index);
    const imageId = generateId("image", id, index);

    return {
        sourceId,
        layerId,
        labelId,
        imageId
    };

};

export {generateId, generateIds};