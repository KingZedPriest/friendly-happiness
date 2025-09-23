import { Logger } from "nexlog/node";

const logger = new Logger({
    structured: true,
    sanitize: true,
});

export default logger;