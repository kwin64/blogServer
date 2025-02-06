import commentsRepository from '../repositories/commands/commentsRepository';

const commentsService = {
  async createComment(userId: string, userLogin: string, content: string) {
    return await commentsRepository.createdCommemt(userId, userLogin, content);
  }
};

export default commentsService;
