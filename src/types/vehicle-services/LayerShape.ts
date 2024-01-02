import { LatLon } from "@/types/vehicle-services/LatLon";

/**
 * A singular  for drawing a shape layer on the map.
 * @property {LatLon} points the latitude, longitude coordinates representing the points to draw the shape.
 * @property {string} text the text to display on the shape.
 * @property {string} color the hex color of the shape.
 */
export type LayerShape = {
  points: LatLon[];
  text: string;
  color: string;
};
