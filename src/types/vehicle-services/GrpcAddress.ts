import * as z from "zod";
import { grpcAddressParser } from "@/data/parsers";

/**
 * The gRPC address of the proxy
 */
export type GrpcAddress = z.infer<typeof grpcAddressParser>;
