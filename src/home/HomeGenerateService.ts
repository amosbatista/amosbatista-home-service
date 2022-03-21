import HomeContentInterface from "./HomeContentInterface";
import MapTranslatorService from '../map/MapTranslatorService';

class HomeGenerateService {
  client: any;

  constructor (
    private redisClientFactory: Function,
    private mapTranslator = new MapTranslatorService
  ) {
    this.client = null;
  }

  saveList(content: Array<HomeContentInterface>, redisKey: string) {
    this.client = this.redisClientFactory();
    
    this.client.del(redisKey);
    content.forEach( (post) => {
      this.client.rpush(redisKey, JSON.stringify(post));
    });

    this.client.quit();
  }
  
  saveContent(content: HomeContentInterface, redisKey: string) {
    this.client = this.redisClientFactory();
    
    this.client.del(redisKey);
    this.client.set(redisKey, JSON.stringify(content));
    
    this.client.quit();
  }
  
  SaveTopContent(content: HomeContentInterface) {
    const redisKey = this.mapTranslator.GetMapAddress("home", "topContent");
    
    if(!redisKey) {
      throw new Error("No link found");
    }
    this.saveContent(content, redisKey);
  }
  
  SaveHighlights(content: Array<HomeContentInterface>) {
    const redisKey = this.mapTranslator.GetMapAddress("home", "highLights");
    
    if(!redisKey) {
      throw new Error("No link found");
    }
    this.saveList(content, redisKey);
  }
}

export default HomeGenerateService;