import { Board } from "../../../models";

export default class BoardService {
  /**
   * 게시글 등록
   * --
   */
  async insertBoard(boardInfo) {
    try {
      const { subject, writer, content, userId } = boardInfo;
      console.log(subject, writer, content);
      const result = await Board.create({
        subject,
        writer,
        content,
        user: userId,
      });
      return result;
    } catch (err) {
      console.error(err);
      throw err.message;
    }
  }

  async listBoard() {
    try {
      const result = await Board.findAll();
      return result;
    } catch (error) {
      throw err.message;
    }
  }

  async deleteBoard(query) {
    try {
      const { id } = query;
      const result = await Board.destroy({
        where: {
          id: id,
        },
      });
      return result;
    } catch (error) {
      throw err.message;
    }
  }

  async getOneBoard(query) {
    try {
      const { id } = query;
      const result = await Board.findOne({
        where: {
          id: id,
        },
      });
      console.log(result.dataValues.count);
      const count = await Board.update(
        { count: result.dataValues.count + 1 },
        {
          where: {
            id: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw err.message;
    }
  }

  async updateBoard(body) {
    try {
      console.log(body);
      const { id, subject, content } = body;
      const result = await Board.update(
        { subject, content },
        {
          where: {
            id: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw err.message;
    }
  }
}
