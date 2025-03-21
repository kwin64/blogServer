import { Container } from 'inversify';
import { BlogRepository } from '../repositories/commands/BlogRepositoryClass';
import { BlogQueryRepository } from '../repositories/queries/BlogQueryRepositoryClass';
import { BlogController } from '../controllers/BlogControllerClass';
import { BlogService } from '../services/BlogServiceClass';

const container = new Container();

container.bind(BlogController).toSelf().inSingletonScope();

container.bind(BlogService).toSelf().inSingletonScope();

container.bind(BlogQueryRepository).toSelf().inSingletonScope();
container.bind(BlogRepository).toSelf().inSingletonScope();

export { container };
