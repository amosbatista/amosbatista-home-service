import HomeContentInterface from "./HomeContentInterface";

class HomeGenerateService {
  CHAVE_REDIS = "HOME:CONTENT";
  client: any;

  constructor (redisClientFactory: Function) {
    this.client = redisClientFactory();
  }

  saveList(content: Array<HomeContentInterface>) {
    this.client.del(this.CHAVE_REDIS);
    content.forEach( (post) => {
      this.client.rpush(this.CHAVE_REDIS, JSON.stringify(post));
    });

    this.client.quit();
  }
}

export default HomeGenerateService;