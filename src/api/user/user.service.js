import bcrypt from "bcrypt";
import { User } from "../../../models";
import JMTManager from "../../utils/JWTManager";

export default class UserService {
  /**
   * 고객 삽입
   * --
   */
  async insertUser(customerInfo) {
    try {
      const { email, nickname, password } = customerInfo;
      const check = await User.findOne({
        where: {
          email: email,
        },
      });
      if (check) {
        throw new Error("Duplicate email");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await User.create({
        email,
        nickname,
        password: hashedPassword,
      });
      return result;
    } catch (err) {
      throw err.message;
    }
  }

  /**
   * 고객 로그인
   * --
   */
  async loginUser(loginInfo) {
    try {
      const { email, password } = loginInfo;
      const user = await User.findOne({
        where: {
          email: email,
        },
        attributes: ["id", "email", "password", "nickname"],
      });
      if (!user) {
        throw new Error("No email");
      }
      const { id, nickname } = user;
      const result = await bcrypt.compare(password, user.password);
      console.log(result);
      if (!result) {
        throw new Error("No password");
      }
      const JM = new JMTManager();
      const token = await JM.createSign({ id, nickname }, "60s");
      const reToken = await JM.createSign({ id, nickname }, "24h");
      return { id, nickname, token, reToken };
    } catch (error) {
      throw error.message;
    }
  }

  async logOutUser() {
    try {
    } catch (error) {}
  }
}
