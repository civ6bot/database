import {DataSource} from "typeorm";

export const dataSource = new DataSource({
    type: "sqlite",
    database: `db.sqlite`,
    entities: [__dirname + "/entities/entity.*.{js,ts}"],
    logging: false,
    synchronize: true
});
