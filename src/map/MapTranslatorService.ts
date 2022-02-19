import Map from "./Map.json"

export default class MapTranslatorService {
  
  GetMapAddress (root: string, endPoint: string ): string|null {
    
    if(!Map[root]) {
      return null;
    }
    
    if(!Map[root]["links"][endPoint]) {
      return null;
    }
    return Map[root]["root"] + ":" + Map[root]["links"][endPoint];
  }
  
}