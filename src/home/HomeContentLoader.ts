import MapTranslatorService from '../map/MapTranslatorService';

export default class HomeTopContentLoader {

  homeContent: Array<any>;
  client: any;

  constructor (
    private redisClientFactory: Function, 
    private mapTranslator = new MapTranslatorService
  ) {
    this.client = null;
  }
  
  Load (): Promise<Array<any>> { 
    return new Promise( (resolve, reject) => {
      this.client = this.redisClientFactory();
      Promise.all([
        this.LoadHelper("home", "topContent"),
        this.ListLoadHelper("home", "highLights"),
      ])
        .catch(err => reject(err))
        .then(contents => {   
          this.client.quit();       
          resolve({
            topContent: contents[0],
            highLights: contents[1],
          } as any);
        });
    });
   }
  
  ListLoadHelper (root: string, address: string): Promise<any> {  

    return new Promise( (resolve, reject) => {
       const redisKey = this.mapTranslator.GetMapAddress(root, address);
    
      if(!redisKey) {
        reject("No link found");
        
        return;
      }
      
      const FIRST_ITEM = 0, LAST_ITEM = -1;
      
      this.client.lrange(
        redisKey,
        FIRST_ITEM, LAST_ITEM,

        (err, redisResponse) => {
          this.client.quit();
        
          if(err) {
            reject(err);
          }
          else{
            resolve(redisResponse);
          }
      });
    });
  }
  
  LoadHelper (root: string, address: string): Promise<any> {  

    return new Promise( (resolve, reject) => {
       const redisKey = this.mapTranslator.GetMapAddress(root, address);
    
      if(!redisKey) {
        reject("No link found");
        
        return;
      }
      
      this.client.get(
        redisKey,
        
        (err, redisResponse) => {
        
          if(err) {
            reject(err);
          }
          else{
            resolve(redisResponse);
          }
      });
    });
  }
}