import EventMapHandler from "@/api/EventMapHandler";
import { vehicleServicesParserMap } from "@/data/parser-maps";
import { VehicleServicesEventPayloadInterface } from "@/types/interfaces";

class VehicleServicesEventMapHandler extends EventMapHandler<VehicleServicesEventPayloadInterface> {
  constructor() {
    super({
      parserMap: vehicleServicesParserMap,
    });
  }
}

export default VehicleServicesEventMapHandler;
