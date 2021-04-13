import Redis from 'redis';

export default () => {
  const client = Redis.createClient({
    url: "redis://homecontentcache.zr98ec.0001.use1.cache.amazonaws.com:6379",
  });

  return client;

  /*return{
    set: (key:string, value:string) => {
      key; value;
    },
    get: (key:string, callback: Function) => {
      key;
      callback("error", null);
    }
  }*/

};