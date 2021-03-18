import { Container } from "typedi";
import UserService from "./user.service";
import JWTManager from "../../utils/JWTManager";

let UserserviceInstance = Container.get(UserService);

export default [
  /**
   * [Post] /users
   * [Description] 유저 등록
   */
  {
    path: "/users",
    method: "post",
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await UserserviceInstance.insertUser(req.body);
        if (!result) {
          return res.status(200).json({
            status: 204,
            message: "Missing parameters",
          });
        }
        return res.status(200).json({
          status: 200,
          message: "success",
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: "failed",
          data: error,
        });
      }
    },
  },
  {
    path: "/users/login",
    method: "post",
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await UserserviceInstance.loginUser(req.body);
        res.cookie("x_auth", result.reToken);
        if (!result) {
          return res.status(200).json({
            status: 204,
            message: "Missing parameters",
          });
        }
        return res.status(200).json({
          status: 200,
          message: "success",
          result,
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: "failed",
          data: error,
        });
      }
    },
  },
  {
    path: "/users/logout",
    method: "get",
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log(req.cookies);
        res.clearCookie("x_auth");
        return res.status(200).json({
          status: 200,
          message: "success",
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: "failed",
          data: error,
        });
      }
    },
  },

  {
    path: "/users/authentication",
    method: "get",
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { x_auth } = req.cookies;
        console.log(x_auth);
        const jm = new JWTManager();
        const decoded = await jm.decoded(x_auth);
        console.log(decoded);
        return res.status(200).json({
          status: 200,
          message: "success",
          data: { id: decoded.id, nickname: decoded.nickname },
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: "failed",
          data: error,
        });
      }
    },
  },
];
