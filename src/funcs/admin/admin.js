import { QueryTypes } from "sequelize";
import crypto from "crypto";
import { db } from "../../index.js";


export const addDietItems = async (body) => {
    const { name, calories } = body;
    let id = crypto.randomUUID();

    const placeResult = await db.query(
        `
        INSERT INTO diet_items(id, name, calories) VALUES(:id, :name, :calories)
        `,
        {
            replacements: { id, name, calories },
            type: QueryTypes.INSERT,
        }
    );
    return placeResult;
}

export const addExcercises = async (body) => {
    const { name, calorieBurned, weight } = body;
    let id = crypto.randomUUID();

    const placeResult = await db.query(
        `
        INSERT INTO excercises(id, name, calorieBurned, weight) VALUES(:id, :name, :calorieBurned, weight)
        `,
        {
            replacements: { id, name, calorieBurned, weight },
            type: QueryTypes.INSERT,
        }
    );
    return placeResult;
}

export const createBlogPost = async (body) => {
    const { title, caption, type, minReqCalories, maxReqCalories, goalType } = body;
    let id = crypto.randomUUID();
    const placeResult = await db.query(
        `
        INSERT INTO posts(id, title, caption, type, minReqCalories, maxReqCalories, goalType) VALUES(:id, :title, :caption, :type, :minReqCalories, :maxReqCalories, :goalType)
        `,
        {
            replacements: { id, title, caption, type, minReqCalories, maxReqCalories, goalType },
            type: QueryTypes.INSERT,
        }
    );
    return placeResult;
}