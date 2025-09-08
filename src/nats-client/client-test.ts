import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { SaveArticleDto, DeleteArticleDto } from '../../article-mgt/src/dto/dto';

@Injectable()
export class TestNatsClient implements OnModuleInit {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  async onModuleInit() {
    await this.client.connect();


    const article: SaveArticleDto = { title: 'Test', content: 'Contenu NATS' };
    const saved = await this.client.send({ cmd: 'SAVE_ARTICLE' }, article).toPromise();
    console.log('Article saved:', saved);

    const all = await this.client.send({ cmd: 'GET_ALL_ARTICLE' }, {}).toPromise();
    console.log('All articles:', all);

    const deleted = await this.client.send({ cmd: 'DELETE_ARTICLE' }, { id: saved.id } as DeleteArticleDto).toPromise();
    console.log('Article deleted:', deleted);
  }
}
