import { notificationTypes } from "@/data/enum";
import { z } from "zod";

const notificationTypeParser = z.enum(notificationTypes);

/**
 * The type of notification (which determines how it is displayed)
 */
type NotificationType = z.infer<typeof notificationTypeParser>;

export type { NotificationType };
