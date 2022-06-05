import { QueryTypes } from "sequelize";
import crypto from "crypto";
import { db } from "../../index.js";

export const signIn = async (body) => {
  const { email } = body;
  const userResult = await db.query(
    `
            SELECT * FROM users WHERE email = :email
        `,
    {
      replacements: { email },
      type: QueryTypes.SELECT,
    }
  );
  return userResult;
};

export const registerUser = async (body) => {
  const { name, email, password } = body;
  let id = crypto.randomUUID();

  const userResult = await db.query(
    `
        INSERT INTO users(id, name, email, password) VALUES(:id, :name, :email, :password)
        `,
    {
      replacements: { id, name, email, password },
      type: QueryTypes.INSERT,
    }
  );
  return userResult;
};

export const emailCheck = async (email) => {
  const getUser = await db.query(
    `
        SELECT * FROM users WHERE email = :email
        `,
    {
      replacements: { email },
      type: QueryTypes.SELECT,
    }
  );
  return getUser;
};

export const verifyUser = async (code, email) => {
  // another query will be added here to fetch the user with that email and check for their code if that matches or not

  const updtUser = await db.query(
    `
        UPDATE user SET isVerified = 1 WHERE email = :email
        `,
    {
      replacements: { email },
      type: QueryTypes.UPDATE,
    }
  );
};

export const updatePassword = async (password, email) => {
  // another query will be added here to fetch the user with that email and check for their code if that matches or not

  const updtUser = await db.query(
    `
        UPDATE user SET password=:password WHERE email = :email
        `,
    {
      replacements: { password, email },
      type: QueryTypes.UPDATE,
    }
  );
};
