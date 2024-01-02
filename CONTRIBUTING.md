# Adding a new Vehicle Services event
1. Determine what the 'payload' of the new event is.
2. If the payload doesn't already exist as a type then create a new ZodSchema for the payload inside "src/data/parsers/vehicle-services". Make sure to call it "<payload-name>Parser" then export it from the "src/data/index.ts" file.
3. Inside "/src/types/vehicle-services" add the payload type and use "z.infer" to infer the type from the parser.
4. Now inside "/src/types/interfaces" add the event name as a key of the VehicleServicesEventPayloadInterface interface with its associated type the new type. All payloads should be "| undefined".
5. Inside "src/data/parser-maps/vehicleServicesParserMap.ts" add the payload parser and the new event as a key-value pair.
6. Update the 'obj' inside "src/data/array/vehicleServicesEvents"
# Adding a new Android method
1. Inside "/src/types/interfaces/AndroidMethodNameSignatureMap.ts" add the method name and its signature as an entry in the interface. The parameters of the method signature should be only of type "number" or "string" or "boolean". Any object types should be stringified.
2. Add the method to the EvamApi class which handles the AndroidMethod and use the EvamApi's AndroidHandler instance to call the method. A non-vs environment handler function must be provided, which will run when the Certified Application is not running inside Vehicle Services.