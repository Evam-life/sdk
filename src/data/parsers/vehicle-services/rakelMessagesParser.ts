import * as z from "zod";

const rakelMessagesParser = z.array(z.string());

export default rakelMessagesParser;
