import express, {Router} from "express";
import {dataSource} from "../../database/datasource";
import {EntityUserSteam} from "../../database/entities/entity.UserSteam";
import {DTOGetUserSteam} from "../../database/dto/DTO.GetUserSteam";
import {DTOUserSteam} from "../../database/dto/DTO.UserSteam";

export const steamRouter: Router = express.Router();

steamRouter.get("/all", async (req, res) => {
    res.send(await dataSource.getRepository(EntityUserSteam).find());
});

// Получить данные
steamRouter.get("/", async (req, res) => {
    let requestData: DTOGetUserSteam = {id: req.body.id};
    let userSteam: EntityUserSteam | null = await dataSource.getRepository(EntityUserSteam).findOne({
        where: requestData
    });
    let responseData: DTOUserSteam = {
        id: requestData.id,
        steamID: (userSteam === null) ? null : userSteam.steamID
    };
    res.send(responseData);
});

// Обновить данные
steamRouter.put("/", async (req, res) => {
    let requestData: DTOUserSteam = {id: req.body.id, steamID: req.body.steamID};
    let responseData: DTOUserSteam;

    let checkUserSteam: EntityUserSteam | null = await dataSource.getRepository(EntityUserSteam).findOneBy({steamID: requestData.steamID as string});
    if(checkUserSteam != null){
        responseData = {id: requestData.id, steamID: null};
        res.send(responseData);
        return;
    }

    let userSteam: EntityUserSteam | null = await dataSource.getRepository(EntityUserSteam).findOneBy({id: requestData.id});
    if(userSteam == null) {
        userSteam = dataSource.getRepository(EntityUserSteam).create({
            id: requestData.id,
            steamID: requestData.steamID as string
        });
    } else {
        await dataSource.getRepository(EntityUserSteam).merge(userSteam, {
            id: requestData.id,
            steamID: requestData.steamID as string
        });
    }
    responseData = await dataSource.getRepository(EntityUserSteam).save(userSteam);
    res.send(responseData);
});
