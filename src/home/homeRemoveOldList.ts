
class HomeRemoveOldListService {
  client: any;

  constructor (
    private redisClientFactory: Function,
  ) {
    this.client = null;
  }

  removeList(redisKey: string = "HOME:CONTENT") {
    this.client = this.redisClientFactory();
    this.client.del(redisKey);
    this.client.quit();
  }
}

export default HomeRemoveOldListService;