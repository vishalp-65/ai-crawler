import { connect as _connect } from "mongoose";
import ServerConfig from "./config";

async function connect() {
    await _connect(ServerConfig.mongoose.url);
}

export default { connect };
