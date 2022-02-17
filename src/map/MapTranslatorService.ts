import HomeMap from "./Home.json"

export default class MapTranslatorService {
  
  GetMapAddress (root: string, endPoint: string ): string|null {
    const maps = [{
      "home": HomeMap,
    }];
    
    if(!maps[root]) {
      return null;
    }
    
    const link = maps[root]["links"].find(link => link === endPoint);
    
    if(!link) {
      return null;
    }
    return maps[root]["root"] + ":" + link;
  }
  
}