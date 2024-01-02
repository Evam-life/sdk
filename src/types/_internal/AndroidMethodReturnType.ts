import { AndroidMethod } from "@/types/_internal/AndroidMethod";
import { AndroidMethodNameSignatureMap } from "@/types/interfaces";

export type AndroidMethodReturnType<M extends AndroidMethod> = ReturnType<
  AndroidMethodNameSignatureMap[M]
>;
