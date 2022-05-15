import {
  successResponse,
  errorResponse,
  failResponse,
} from "../funcs/validationResponse.js";
import * as authFuncs from "../funcs/user/userAuth.js";
import * as feedFuncs from "../funcs/user/userFeed.js";
import { middleWareFunc } from "../funcs/tokenMiddleware.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return failResponse(req, res, "no email provided");
    }

    if (!password) {
      return failResponse(req, res, "no password provided");
    }
    const signInResponse = await authFuncs.signIn(req.body);
    if (signInResponse.length <= 0) {
      return failResponse(req, res, "no user exists with this email");
    }

    if (signInResponse[0].password !== password) {
      return failResponse(req, res, "incorrect password for this user");
    }
    const user = signInResponse[0];
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWTPWD,
      { expiresIn: "5d" }
    );
    return successResponse(req, res, token);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, username, password, phone } = req.body;

    if (!email) {
      return failResponse(req, res, "please provide an email to proceed");
    }

    if (!username) {
      return failResponse(req, res, "please provide a username to proceed");
    }

    if (!password) {
      return failResponse(req, res, "please provide a password to proceed");
    }

    if (!phone) {
      return failResponse(req, res, "please provide a phone number to proceed");
    }

    const emailAvail = await authFuncs.emailCheck(req.body.email);
    if (emailAvail.length > 0) {
      return failResponse(req, res, "email already exists ");
    }

    const userResult = await authFuncs.registerUser(req.body);
    return successResponse(req, res, userResult);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const sendEmail = async (req, res) => {
  try {
    if (!req.body.email) {
      return failResponse(req, res, "please provide an email");
    }
    const { email } = req.body;
    // function call to email sending code
    // also adding code to the user's record in db for further checking
    return successResponse(req, res, "email sent");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const verifyCode = async (req, res) => {
  try {
    if (!req.body.code) {
      return failResponse(req, res, "please provide a code to be verified ");
    }
    if (!req.body.email) {
      return failResponse(req, res, "email needs to be given here ");
    }
    const { code, email } = req.body;
    const verified = await authFuncs.verifyUser(code, email);
    return successResponse(req, res, "verified!! ");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updatePassword = async (req, res) => {
  try {
    if (!req.body.password) {
      return failResponse(req, res, "please provide a password to update ");
    }
    if (!req.body.email) {
      return failResponse(req, res, "email needs to be given here ");
    }
    const { password, email } = req.body;
    const verified = await authFuncs.updatePassword(password, email);
    return successResponse(req, res, "password updated ");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createUserPost = async (req, res) => {
  try {
    if (!req.body.userId) {
      return failResponse(req, res, "please provide a userId in the body will be updated by token in the future ");
    }
    // if (!req.body.email) {
    //   return failResponse(req, res, "email needs to be given here ");
    // }
    const { userId, title, caption, image, placeId } = req.body;
    const verified = await feedFuncs.createPlacePost(req.body);
    return successResponse(req, res, "post created ");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPosts = async (req, res) => {
  try {
    // if (!req.body.userId) {
    //   return failResponse(req, res, "please provide a userId in the body will be updated by token in the future ");
    // }
    // if (!req.body.email) {
    //   return failResponse(req, res, "email needs to be given here ");
    // }
    const posts = await feedFuncs.getPosts();
    return successResponse(req, res, posts);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};