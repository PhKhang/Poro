import { Nitro } from "nitropack"
import mongoose from "mongoose"

export default async (nitro: Nitro) => {
    const config = useRuntimeConfig();
    
    console.log("Nitro plugin")
    console.log(`Connecting ${config.mongoURI}`)
    try {
        // Connect to mongodb atlas
        await mongoose.connect(config.mongoURI)
        
        // Display connection status
        const connectionStateIndex = mongoose.connection.readyState
        console.log(`Connection status: ${mongoose.ConnectionStates[connectionStateIndex]} ${connectionStateIndex == 1 ?"✅" : "💀"}`)
    }
    catch (err) {
        const connectionStateIndex = mongoose.connection.readyState
        console.log(`Connection status: ${mongoose.ConnectionStates[connectionStateIndex]} ${connectionStateIndex == 1 ?"✅" : "💀"}`)
        console.error(err)
    }
};