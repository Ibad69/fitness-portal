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

export const getCustomPosts = async(body) => {

  const userId = body.userId;
  
  let userDetails = await getUserHealthDetails(userId);
  userDetails = userDetails[0];
  const intake = parseInt(userDetails.recommendedIntake);
  const goal = userDetails.goal;

  const postResult = await db.query(
      `
      SELECT * FROM posts WHERE :intake >= minReqCalories  AND :intake <= maxReqCalories AND goalType = :goal
      `,
      {
          replacements: { intake, goal },
          type: QueryTypes.SELECT,
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


   // miscellanous functions 

   //getting user health details 

   export const getUserHealthDetails = async(userId) => {
   
    const userResult = await db.query(
        `
                SELECT name, email, uhd.weight, uhd.height, uhd.goal, uhd.recommendedIntake 
                FROM users JOIN user_health_details as uhd ON uhd.userId = users.id WHERE users.id = :userId

            `,
        {
          replacements: { userId },
          type: QueryTypes.SELECT,
        }
      );
      return userResult;
   
   
   }