import { Board } from "../../../models";

export default class BoardService {
  /**
   * 고객 삽입
   * --
   */
  async insertBoard(boardInfo) {
    try {
      const { subject, writer, content } = boardInfo;
      console.log(subject, writer, content);
      const result = await Board.create({
        subject,
        writer,
        content,
        count: 1,
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
}
