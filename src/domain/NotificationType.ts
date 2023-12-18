enum NotificationType {
    /** Used for a notification that appears briefly over the current screen. */
    QUICK_HUN = "QUICK_HUN",
    /** Used for a notification that will go directly in the Notification Center. */
    CONCEALED_HUN = "CONCEALED_HUN",
    /** Used for a notification that will not show its description, until moved to the Notification Center. */
    LIMITED_HUN = "LIMITED_HUN",
    /** Used for a notification that appears in the middle of the screen area, over the entire UI. */
    LASTING_HUN = "LASTING_HUN",
    /** Used for a notification with only app name, time, and actions buttons. Displayed for a shorter amount of time. */
    ACTION_HUN = "ACTION_HUN"
}

export {NotificationType};