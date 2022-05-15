import { QueryTypes } from "sequelize";
import { db } from "../../index.js";


export const getTopPlaces = async (body) => {
    const userResult = await db.query(
      `
              SELECT * FROM places
          `,
      {
        replacements: { },
        type: QueryTypes.SELECT,
      }
    );
    return userResult;
  };