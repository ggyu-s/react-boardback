import { Container } from "typedi";
import BoardService from "./board.service";
import JWTManager from "../../utils/JWTManager";

let BoardServiceInstance = Container.get(BoardService);

export default [
  /**
   * [Post] /users
   * [Description] 유저 등록
   */
  {
    path: "/board/write",
    method: "post",
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await BoardServiceInstance.insertBoard(req.body);
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
    path: "/board",
    method: "get",
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await BoardServiceInstance.listBoard();
        return res.status(200).json({
          status: 200,
          message: "success",
          data: result,
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
    path: "/board",
    method: "delete",
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await BoardServiceInstance.deleteBoard(req.query);
        if (!result) {
          throw new Error();
        }
        return res.status(200).json({
          status: 200,
          message: "success",
        });
      } catch (error) {
        return (
          res.status(500),
          json({
            status: 500,
            message: "failed",
            data: error,
          })
        );
      }
    },
  },
  {
    path: "/board/list",
    method: "get",
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await BoardServiceInstance.getOneBoard(req.query);
        if (!result) {
          throw new Error();
        }
        return res.status(200).json({
          status: 200,
          message: "success",
          data: result,
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
    path: "/board/update",
    method: "put",
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await BoardServiceInstance.updateBoard(req.body);
        if (!result) {
          throw new Error();
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
