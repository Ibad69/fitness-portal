import { QueryTypes } from "sequelize";
import crypto from "crypto";
import { db } from "../../index.js";


export const addUserHealthDetails = async(body) => {

 const {  userId, gender, weight, height, goal, caloriesIntake, caloriesBurned } = body;
 let recommendedIntake = 150;
 let id = crypto.randomUUID();

 const postResult = await db.query(
     `
     INSERT INTO user_health_details(id, userId, gender, weight, height, goal, recommendedIntake, caloriesIntake, caloriesBurned) 
     VALUES(:id, :userId, :gender, :weight, :height, :goal, :recommendedIntake, :caloriesIntake, :caloriesBurned)
     `,
     {
         replacements: { id, userId, gender, weight, height, goal, recommendedIntake, caloriesIntake, caloriesBurned },
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