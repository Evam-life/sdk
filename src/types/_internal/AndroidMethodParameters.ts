import { AndroidMethod } from "@/types/_internal/AndroidMethod";
import { AndroidMethodNameSignatureMap } from "@/types/interfaces";

export type AndroidMethodParameters<M extends AndroidMethod> = Parameters<
  AndroidMethodNameSignatureMap[M]
>;
