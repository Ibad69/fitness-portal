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

export const getPosts = async() => {
   
    const userResult = await db.query(
        `
                SELECT userposts.id, userposts.title, userposts.caption, userposts.image, userposts.placeId, 
                userposts.createdAt, user.username, user.profileImage, user.id FROM userposts 
                LEFT JOIN user ON user.id = userposts.userId

            `,
        {
          replacements: { },
          type: QueryTypes.SELECT,
        }
      );
      return userResult;
   
   
   }