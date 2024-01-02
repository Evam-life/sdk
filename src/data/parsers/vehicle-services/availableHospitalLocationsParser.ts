import * as z from "zod";
import hospitalLocationParser from "@/data/parsers/vehicle-services/hospitalLocationParser";

const availableHospitalLocationsParser = z.array(hospitalLocationParser);

export default availableHospitalLocationsParser;
