import {
    successResponse,
    errorResponse,
    failResponse,
} from "../funcs/validationResponse.js";

import crypto from "crypto";
import * as adminFuncs from '../funcs/admin/admin.js';

export const addDietItems = async(req, res) => {
    try{
        const {name, calories} = req.body;
        if(!name){
            return failResponse(req, res, "no name given for the place ");
        }
        if(!calories){
            return failResponse(req, res, "please provide coordinates for the place ");
        }
        const apiRes = await adminFuncs.addDietItems(req.body);
        return successResponse(req, res, apiRes);
    }catch(error){
        return errorResponse(req, res, error);
    }
}

export const addExcercise = async(req, res) => {
    try{
        const {name, calorieBurned, weight} = req.body;
        if(!name){
            return failResponse(req, res, "no name given for the excercise ");
        }
        if(!calorieBurned){
            return failResponse(req, res, "please provide burned calories for this place ");
        }
        const apiRes = await adminFuncs.addExcercises(req.body);
        return successResponse(req, res, apiRes);
    }catch(error){
        return errorResponse(req, res, error);
    }
}

export const createBlogPost = async(req, res) => {
    try{
        const apiRes = await adminFuncs.createBlogPost(req.body);
        return successResponse(req, res, apiRes);
    }catch(error){
        return errorResponse(req, res, error);
    }
}

