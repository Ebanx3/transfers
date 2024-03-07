import { config } from "dotenv";

config();

const node_env = process.env.NODE_ENV;
console.log(node_env);

export default {
    PORT: process.env.PORT || 8080,
    HOTELBEDS_API_URI: node_env === "DEV" ? process.env.TEST_HB_TRANSFER_API_URI : "",
    HOTELBEDS_CACHE_API_URI: node_env === "DEV" ? process.env.TEST_HB_TRANSFER_CACHE_API_URI : "",
    HOTELBEDS_API_KEY: node_env === "DEV" ? process.env.TEST_HOTELBEDS_API_KEY : process.env.HOTELBEDS_API_KEY,
    SECRET_KEY: process.env.SECRET_kEY || "secrett",
    EXPIRATION_TIME: process.env.EXPIRATION_TIME
}