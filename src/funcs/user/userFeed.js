import { QueryTypes } from "sequelize";
import crypto from "crypto";
import { db } from "../../index.js";


export const createPlacePost = async(body) => {

 const { userId, title, caption, image, placeId } = body;

 let id = crypto.randomUUID();

 const postResult = await db.query(
     `
     INSERT INTO userposts(id, userId, title, caption, image, placeId) VALUES(:id, :userId, :title, :caption, :image, :placeId)
     `,
     {
         replacements: { id, userId, title, caption, image, placeId },
         type: QueryTypes.INSERT,
     }
 );
 return postResult;


}

export const getDietItems = async() => {
   
    const userResult = await db.query(
        `
                SELECT * FROM diet_items

            `,
        {
          replacements: { },
          type: QueryTypes.SELECT,
        }
      );
      return userResult;
   
   
   }

   export const getExcercises = async() => {
   
    const userResult = await db.query(
        `
                SELECT * FROM excercises

            `,
        {
          replacements: { },
          type: QueryTypes.SELECT,
        }
      );
      return userResult;
   
   
   }