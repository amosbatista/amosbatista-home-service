import MapTranslatorService from '../map/MapTranslatorService';

export default class HomeTopContentLoader {

  homeContent: Array<any>;
  client: any;

  constructor (
    redisClientFactory: Function, 
    private mapTranslator = new MapTranslatorService
  ) {
    this.client = redisClientFactory();
  }
  
  Load (): Promise<Array<any>> { 
    return new Promise( (resolve, reject) => {
      
      Promise.all([
        this.LoadHelper("home", "topContent"),
        this.LoadHelper("home", "highLights"),
      ])
        .catch(err => reject(err))
        .then(contents => {
          console.log(contents);
          resolve({
            topContent: contents[0],
            highLights: contents[1],
          } as any);
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
}