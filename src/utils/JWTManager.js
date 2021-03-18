import JWT from "jsonwebtoken";
import jwtConfig from "../config/jwt";

export default class Authenticator {
  constructor() {
    if (!Authenticator.instance) {
      Authenticator.instance = this;
    }
    return Authenticator.instance;
  }

  /**
   * 토큰 생성
   */
  async createSign(data, expiresIn) {
    return JWT.sign(data, jwtConfig.secret, { expiresIn });
  }

  async verify(token) {
    try {
      const decoded = await JWT.verify(token, jwtConfig.secret);
      if (decoded) return true;
    } catch (error) {
      return false;
    }
  }

  async decoded(token) {
    return JWT.verify(token, jwtConfig.secret);
  }
}
