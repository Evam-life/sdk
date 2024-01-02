import { z } from "zod";

const vehicleServicesCallbackIdSuffixParser = z
  .literal("-p")
  .or(z.literal("-s"));
export default vehicleServicesCallbackIdSuffixParser;
