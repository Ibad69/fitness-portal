import { QueryTypes } from "sequelize";
import crypto from "crypto";
import { db } from "../../index.js";
import req from "express/lib/request";


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

    if(req.body.headings){
        for(const item of headings){
            const id2 = crypto.randomUUID();
            const postId = id;
            const { caption, description, additionalDescription, mediaUrl } = item;
            await db.query(
                `
                INSERT INTO post_content(id, postId, caption, description, additionalDescription, mediaUrl) VALUES(:id2, :postId, :caption, :description, :additionalDescription, 
                    :mediaUrl)
                `,
                {
                    replacements: { id2, caption, description, additionalDescription, mediaUrl, postId },
                    type: QueryTypes.INSERT,
                }
            );
        }
    }

    if(req.body.slider){
        for(const item of slider){
            const id2 = crypto.randomUUID();
            const postId = id;
            const { fileType, fileURL } = item;
             await db.query(
                `
                INSERT INTO posts_media(id, postId, fileType, fileURL) VALUES(:id2, :postId, :fileType, :fileURL)
                `,
                {
                    replacements: { id2, postId, fileType, fileURL },
                    type: QueryTypes.INSERT,
                }
            );
        }
    }

    return placeResult;
}