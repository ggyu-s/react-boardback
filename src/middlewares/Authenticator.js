/**
 *
 */

import JMTManager from "../utils/JWTManager";

export const UserAuthenticator = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const rawToken = authorization.split("Bearer ");
      const jm = new JMTManager();
      const token = await jm.verify(rawTokenp[1]);

      if (token) {
        next();
        return;
      }
    }
    return res.status(401).json({
      resultCode: 401,
      resultMessage: "Access denied",
    });
  } catch (error) {}
};
