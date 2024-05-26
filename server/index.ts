import { Nitro } from "nitropack"
import mongoose from "mongoose"

export default async (nitro: Nitro) => {
    const config = useRuntimeConfig();
    
    console.log("Nitro plugin")
    console.log(`Connecting ${config.mongoURI}`)
    try {
        await mongoose.connect(config.mongoURI)
        const connectionStateIndex = mongoose.connection.readyState
        console.log(`Connection status: ${mongoose.ConnectionStates[connectionStateIndex]}`)
    }
    catch (err) {
        console.error(err)
    }
};