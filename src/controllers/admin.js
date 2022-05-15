import {
    successResponse,
    errorResponse,
    failResponse,
} from "../funcs/validationResponse.js";

import crypto from "crypto";
import * as adminFuncs from '../funcs/admin/admin.js';

export const addPlace = async(req, res) => {
    try{
        const {name, coordinates, address, openTimings, closeTimings} = req.body;
        if(!name){
            return failResponse(req, res, "no name given for the place ");
        }
        if(!coordinates){
            return failResponse(req, res, "please provide coordinates for the place ");
        }
        const apiRes = await adminFuncs.addPlace(req.body);
        return successResponse(req, res, apiRes);
    }catch(error){
        return errorResponse(req, res, error);
    }
}
