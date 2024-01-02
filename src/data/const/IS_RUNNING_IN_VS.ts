const getIsRunningInVs = (): boolean => {
  try {
    // @ts-expect-error Android is not defined outside of a WebView environment
    const android = Android;
    return android !== undefined;
  } catch {
    return false;
  }
};

const IS_RUNNING_IN_VS = getIsRunningInVs();
export default IS_RUNNING_IN_VS;
