import { QueryTypes } from "sequelize";
import crypto from "crypto";
import { db } from "../../index.js";


export const addUserHealthDetails = async (body) => {

  const { userId, gender, weight, height, caloriesIntake, caloriesBurned, excercises, dietPlan, age } = body;
  let bmr;
  let bmi;
  let goal;
  let recommendedIntake;
  let bmiType;
  if (gender === "MALE") {
    let uptHeight = height.split(/[, ]+/);
    let heightInCm = ((parseFloat(uptHeight[0]) * 12) + parseFloat(uptHeight[1])) * 2.54;
    bmr = (10 * parseFloat(weight)) + (6.25 * heightInCm) - (5 * parseInt(age)) + 5;
    bmi = (parseFloat(weight) / (heightInCm * heightInCm)) * 10000;
    let totalCalories = caloriesIntake - caloriesBurned;
    if (parseFloat(totalCalories) > parseFloat(bmr) || parseFloat(totalCalories) === parseFloat(bmr)) {
      if (bmi <= 18.5) {
        goal = "weightGain";
        bmiType = "under-weight";
        recommendedIntake = 500;
      }
      else if (bmi > 18.5 && bmi < 24.9) {
        goal = "stayFit";
        bmiType = "healthy";
        recommendedIntake = 0;
      }
      else if (bmi >= 25 && bmi <= 29.9) {
        goal = "weightLose"
        bmiType = "over-weight";
        recommendedIntake = 0;
      }
      else if (bmi >= 25 && bmi <= 29.9) {
        goal = "weightLose"
        bmiType = "obese";
        recommendedIntake = 0;
      }
    }
    else if (parseFloat(totalCalories) < parseFloat(bmr)) {
      if (bmi <= 18.5) {
        goal = "weightGain";
        bmiType = "under-weight";
        recommendedIntake = 500;
      }
      else if (bmi > 18.5 && bmi < 24.9) {
        goal = "stayFit";
        bmiType = "healthy";
        recommendedIntake = 0;
      }
      else if (bmi >= 25 && bmi <= 29.9) {
        goal = "weightLose"
        bmiType = "over-weight";
        recommendedIntake = 0;
      }
      else if (bmi >= 25 && bmi <= 29.9) {
        goal = "weightLose"
        bmiType = "obese";
        recommendedIntake = 0;
      }
    }
    console.log(bmr);
    console.log(bmi);
    console.log(recommendedIntake);
  }
  // calcls for females
  else if (gender === "FEMALE") {
    let uptHeight = height.split(/[, ]+/);
    let heightInCm = ((parseFloat(uptHeight[0]) * 12) + parseFloat(uptHeight[1])) * 2.54;
    bmr = (10 * parseFloat(weight)) + (6.25 * heightInCm) - (5 * parseInt(age)) - 161;
    bmi = (parseFloat(weight) / (heightInCm * heightInCm)) * 10000;
    let totalCalories = caloriesIntake - caloriesBurned;
    if (parseFloat(totalCalories) > parseFloat(bmr) || parseFloat(totalCalories) === parseFloat(bmr)) {
      if (bmi <= 18.5) {
        goal = "weightGain";
        bmiType = "under-weight";
        recommendedIntake = 500;
      }
      else if (bmi > 18.5 && bmi < 24.9) {
        goal = "stayFit";
        bmiType = "healthy";
        recommendedIntake = 0;
      }
      else if (bmi >= 25 && bmi <= 29.9) {
        goal = "weightLose"
        bmiType = "over-weight";
        recommendedIntake = 0;
      }
      else if (bmi >= 25 && bmi <= 29.9) {
        goal = "weightLose"
        bmiType = "obese";
        recommendedIntake = 0;
      }
    }
    else if (parseFloat(totalCalories) < parseFloat(bmr)) {

      if (bmi <= 18.5) {
        goal = "weightGain";
        bmiType = "under-weight";
        recommendedIntake = 500;
      }
      else if (bmi > 18.5 && bmi < 24.9) {
        goal = "stayFit";
        bmiType = "healthy";
        recommendedIntake = 0;
      }
      else if (bmi >= 25 && bmi <= 29.9) {
        goal = "weightLose"
        bmiType = "over-weight";
        recommendedIntake = 0;
      }
      else if (bmi >= 25 && bmi <= 29.9) {
        goal = "weightLose"
        bmiType = "obese";
        recommendedIntake = 0;
      }
    }
    console.log(totalCalories);
    console.log(bmr);
    console.log(bmi);
    console.log(recommendedIntake);
  }
  let id = crypto.randomUUID();

  const postResult = await db.query(
    `
     INSERT INTO user_health_details(id, userId, gender, weight, height, goal, recommendedIntake, caloriesIntake, caloriesBurned, age, bmiType) 
     VALUES(:id, :userId, :gender, :weight, :height, :goal, :recommendedIntake, :caloriesIntake, :caloriesBurned, :age, :bmiType)
     `,
    {
      replacements: { id, userId, gender, weight, height, goal, recommendedIntake, caloriesIntake, caloriesBurned, age, bmiType },
      type: QueryTypes.INSERT,
    }
  );

  for (const item of excercises) {
    let id = crypto.randomUUID();
    const excerciseId = item.excerciseId;
    const postResult = await db.query(
      `
     INSERT INTO user_excercises(id, userId, excerciseId) VALUES(:id, :userId, :excerciseId)
     `,
      {
        replacements: { id, userId, excerciseId },
        type: QueryTypes.INSERT,
      }
    );
  }

  for (const item of dietPlan) {
    let id = crypto.randomUUID();
    const dietItemId = item.dietItemId;
    const postResult = await db.query(
      `
   INSERT INTO user_diet_plans(id, userId, dietItemId) VALUES(:id, :userId, :dietItemId)
   `,
      {
        replacements: { id, userId, dietItemId },
        type: QueryTypes.INSERT,
      }
    );
  }


  return postResult;


}

export const getCustomPosts = async (body) => {

  const userId = body.userId;

  let userDetails = await getUserHealthDetails(userId);
  userDetails = userDetails[0];
  if (!userDetails.recommendedIntake) {
    const randomPosts = await getRandomPosts();
    return randomPosts;
  }
  if (userDetails.goal === "weightLose") {
    return await getWeightLose();
  }
  if (userDetails.goal === "stayFit") {
    return await getStayFit();
  }
  const intake = parseInt(userDetails.recommendedIntake);
  const goal = userDetails.goal;

  const postResult = await db.query(
    `
      SELECT 
       id, title, caption, type, summary,
       (
        SELECT 
        JSON_ARRAYAGG(JSON_OBJECT(
            "postContentId",pc.id,
            "postContentCaption",pc.caption,
            "description",pc.description,
            "additionalDescription",pc.additionalDescription,
            "mediaUrl",pc.mediaUrl
        )) 
        FROM  post_content as pc
        WHERE postId = posts.id
        ) as headings,
        (
          SELECT 
          JSON_ARRAYAGG(JSON_OBJECT(
              "sliderId",slider.id,
              "fileType",fileType,
              "fileURL",fileURL
          )) 
          FROM  posts_media as slider
          WHERE postId = posts.id
          ) as slider
       FROM posts WHERE :intake >= minReqCalories  AND :intake <= maxReqCalories AND goalType = :goal AND posts.isDeleted = 0
      `,
    {
      replacements: { intake, goal },
      type: QueryTypes.SELECT,
    }
  );
  return postResult;


}


export const getRandomPosts = async (body) => {


  const postResult = await db.query(
    `
      SELECT 
       id, title, caption, type, summary,
       (
        SELECT 
        JSON_ARRAYAGG(JSON_OBJECT(
            "postContentId",pc.id,
            "postContentCaption",pc.caption,
            "description",pc.description,
            "additionalDescription",pc.additionalDescription,
            "mediaUrl",pc.mediaUrl
        )) 
        FROM  post_content as pc
        WHERE postId = posts.id
        ) as headings,
        (
          SELECT 
          JSON_ARRAYAGG(JSON_OBJECT(
              "sliderId",slider.id,
              "fileType",fileType,
              "fileURL",fileURL
          )) 
          FROM  posts_media as slider
          WHERE postId = posts.id
          ) as slider
       FROM posts WHERE posts.isDeleted = 0
      `,
    {
      replacements: {},
      type: QueryTypes.SELECT,
    }
  );
  return postResult;


}

export const getWeightLose = async () => {
  const postResult = await db.query(
    `
      SELECT 
       id, title, caption, type, summary,
       (
        SELECT 
        JSON_ARRAYAGG(JSON_OBJECT(
            "postContentId",pc.id,
            "postContentCaption",pc.caption,
            "description",pc.description,
            "additionalDescription",pc.additionalDescription,
            "mediaUrl",pc.mediaUrl
        )) 
        FROM  post_content as pc
        WHERE postId = posts.id
        ) as headings,
        (
          SELECT 
          JSON_ARRAYAGG(JSON_OBJECT(
              "sliderId",slider.id,
              "fileType",fileType,
              "fileURL",fileURL
          )) 
          FROM  posts_media as slider
          WHERE postId = posts.id
          ) as slider
       FROM posts WHERE goalType = 'weightLose' AND posts.isDeleted = 0
      `,
    {
      replacements: {},
      type: QueryTypes.SELECT,
    }
  );
  return postResult;
}

export const getStayFit = async () => {
  const postResult = await db.query(
    `
      SELECT 
       id, title, caption, type, summary,
       (
        SELECT 
        JSON_ARRAYAGG(JSON_OBJECT(
            "postContentId",pc.id,
            "postContentCaption",pc.caption,
            "description",pc.description,
            "additionalDescription",pc.additionalDescription,
            "mediaUrl",pc.mediaUrl
        )) 
        FROM  post_content as pc
        WHERE postId = posts.id
        ) as headings,
        (
          SELECT 
          JSON_ARRAYAGG(JSON_OBJECT(
              "sliderId",slider.id,
              "fileType",fileType,
              "fileURL",fileURL
          )) 
          FROM  posts_media as slider
          WHERE postId = posts.id
          ) as slider
       FROM posts WHERE goalType = 'stayFit' AND posts.isDeleted = 0
      `,
    {
      replacements: {},
      type: QueryTypes.SELECT,
    }
  );
  return postResult;
}

export const getDietItems = async () => {

  // const userResult = await db.query(
  //   `
  //               SELECT * FROM diet_items

  //           `,
  //   {
  //     replacements: {},
  //     type: QueryTypes.SELECT,
  //   }
  // );
  for(let i = 0; i < 3; i++){
    setTimeout(function() {alert(i);}, 1000 + i);
  }
  return userResult;


}

export const getExcercises = async () => {

  const userResult = await db.query(
    `
                SELECT * FROM excercises

            `,
    {
      replacements: {},
      type: QueryTypes.SELECT,
    }
  );
  return userResult;


}

export const getDiseases = async () => {

  const userResult = await db.query(
    `
                SELECT * FROM diseases

            `,
    {
      replacements: {},
      type: QueryTypes.SELECT,
    }
  );
  return userResult;


}

export const getPostByDis = async (body) => {

  const diseaseId = body.diseaseId;

  const postResult = await db.query(
    `
      SELECT 
       id, title, caption, type, summary,
       (
        SELECT 
        JSON_ARRAYAGG(JSON_OBJECT(
            "postContentId",pc.id,
            "postContentCaption",pc.caption,
            "description",pc.description,
            "additionalDescription",pc.additionalDescription,
            "mediaUrl",pc.mediaUrl
        )) 
        FROM  post_content as pc
        WHERE postId = posts.id
        ) as headings,
        (
          SELECT 
          JSON_ARRAYAGG(JSON_OBJECT(
              "sliderId",slider.id,
              "fileType",fileType,
              "fileURL",fileURL
          )) 
          FROM  posts_media as slider
          WHERE postId = posts.id
          ) as slider
       FROM posts WHERE diseaseId = :diseaseId AND posts.isDeleted = 0
      `,
    {
      replacements: { diseaseId },
      type: QueryTypes.SELECT,
    }
  );
  return postResult;


}




// miscellanous functions 

//getting user health details 

export const getUserHealthDetails = async (userId) => {

  const userResult = await db.query(
    `
                SELECT name, email, uhd.weight, uhd.height, uhd.goal, uhd.recommendedIntake 
                FROM users LEFT JOIN user_health_details as uhd ON uhd.userId = users.id WHERE users.id = :userId

            `,
    {
      replacements: { userId },
      type: QueryTypes.SELECT,
    }
  );
  return userResult;


}

export const getUserHealthCheck = async (userId) => {

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