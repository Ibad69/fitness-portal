import {
    successResponse,
    errorResponse,
    failResponse,
  } from "../funcs/validationResponse.js";

import * as homePageFuncs from '../funcs/homepage/homepage.js'; 


export const topPlaces = async(req, res) => {
    try{
        const topPlaces = await homePageFuncs.getTopPlaces();
        return successResponse(req, res, topPlaces);
    }catch(error){
        return errorResponse(req, res, error);
    }
}