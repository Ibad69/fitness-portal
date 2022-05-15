import { QueryTypes } from "sequelize";
import crypto from "crypto";
import { db } from "../../index.js";


export const addPlace = async (body) => {
    const { name, coordinates, address, openTimings, closeTimings } = body;
    let id = crypto.randomUUID();

    const placeResult = await db.query(
        `
        INSERT INTO places(id, name, coordinates, address, openTimings, closeTimings) VALUES(:id, :name, :coordinates, :address, :openTimings, :closeTimings)
        `,
        {
            replacements: { id, name, coordinates, address, openTimings, closeTimings },
            type: QueryTypes.INSERT,
        }
    );
    return placeResult;
}