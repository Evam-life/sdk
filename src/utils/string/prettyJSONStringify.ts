const prettyJSONStringify = (arg: Parameters<typeof JSON.stringify>[0]) =>
  JSON.stringify(arg, Object.keys(arg).sort(), 2);
export default prettyJSONStringify;
