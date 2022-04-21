import * as dotenv from "dotenv";
import {server} from "./server/server";
import {dataSource} from "./database/datasource";

dotenv.config();

server.listen(process.env.DATABASE_PORT, async () => {
    await dataSource.initialize();
    console.log(`Database server listening on PORT=${process.env.DATABASE_PORT}`);
});
