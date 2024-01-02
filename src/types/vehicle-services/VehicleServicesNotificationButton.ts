/**
 * Represents a button on a VehicleServices notification.
 * @property {string} label the label of the button
 * @property {() => void} callback the function that will trigger on clicking the button.
 * @see EvamApi.prototype.notification
 */
type VehicleServicesNotificationButton = {
  label: string;
  callback: () => void;
};

export type { VehicleServicesNotificationButton };
