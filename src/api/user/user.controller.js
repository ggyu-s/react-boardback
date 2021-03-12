import { Container } from "typedi";
import UserService from "./user.service";

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
];
