import * as z from "zod";

const dateTransformer = (val: ConstructorParameters<typeof Date>[0]) =>
  new Date(val);

const vehicleServicesDatePayloadParser = z
  .number()
  .transform(val => {
    const epochMillisMidnight_01_01_2000 = 946684800000;
    const modifier = val < epochMillisMidnight_01_01_2000 ? 1000 : 1;
    return val * modifier;
  })
  .transform(dateTransformer)
  .or(z.date());

export default vehicleServicesDatePayloadParser;
