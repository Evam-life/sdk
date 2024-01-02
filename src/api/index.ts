import { default as EvamApiClass } from "@/api/EvamApi";

//the reason we wrap the class like this is that we wanted to make the methods static on the EvamApi. This led to 2 issues.
//classes will inherit from a global parent type and come with extra properties. Also some IDEs (for whatever reason) struggle to show suggestions for static methods.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { prototype, ...EvamApi } = EvamApiClass;

export { EvamApi };
