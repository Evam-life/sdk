import * as z from "zod";
import vehicleStatusParser from "@/data/parsers/vehicle-services/vehicleStatusParser";

const vehicleStatusListParser = z.array(vehicleStatusParser);

export default vehicleStatusListParser;
