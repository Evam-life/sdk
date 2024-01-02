import { AndroidMethodNameSignatureMap } from "@/types/interfaces";

export type AndroidMethod = {
  [K in keyof AndroidMethodNameSignatureMap]: Parameters<
    AndroidMethodNameSignatureMap[K]
  > extends readonly (string | number | boolean)[]
    ? K
    : never;
}[keyof AndroidMethodNameSignatureMap];
