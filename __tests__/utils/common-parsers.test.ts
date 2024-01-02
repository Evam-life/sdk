import { faker } from "@faker-js/faker";
import { vehicleServicesDatePayloadParser } from "@/utils/common-parsers";

describe("vehicleServicesDatePayloadSchema", () => {
  const randomDate = faker.date.between({
    from: 946684800000+1,
    to: Date.now(),
  });
  it("should parse a valid date to the same date * 1000", () => {
    const parse = vehicleServicesDatePayloadParser.parse(randomDate.getTime());
    expect(randomDate.getTime()).toEqual(parse.getTime());
  });
});
