const mongodb = require("../mongodb");
const carparkData = require("./carpark_data");

async function run() {
    try {
        const insertResult = await mongodb.db
            .collection("carparks")
            .insertMany(carparkData);
        console.log(insertResult);
    } catch (err) {
        console.log(err);
    } finally {
        mongodb.client.close();
    }
}

run();