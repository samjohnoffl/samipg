const { CosmosClient } = require("@azure/cosmos");
const { SignalRClient } = require("@azure/azure-signalr");

const cosmosClient = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
const signalRClient = new SignalRClient(process.env.SIGNALR_CONNECTION_STRING);

module.exports = async function (context, req) {
    const vote = req.body.vote;

    // Store the vote in Cosmos DB
    const { database } = await cosmosClient.databases.readAll().fetchAll();
    const container = database[0].containers[0];
    await container.items.create({ vote });

    // Broadcast to all connected clients
    await signalRClient.sendToAll('newVote', { vote });

    context.res = {
        status: 200,
        body: { message: "Vote recorded successfully!" }
    };
};
