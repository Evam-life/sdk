import { LatLon } from "@/types/vehicle-services/LatLon";

/**
 * A singular  for drawing a point layer on the map.
 * @property {LatLon} point the latitude, longitude coordinates to draw the point.
 * @property {string} text the text to display on the point.
 * @property {string} icon the icon to draw on the point (based on the name of a Material Design icon)
 */
export type LayerPoint = {
  point: LatLon;
  text: string;
  icon: string;
};
