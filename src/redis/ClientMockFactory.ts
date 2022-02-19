export default () => {

  return{
    set: (key:string, value:string) => {
      console.log("SET " + key + ":" + value);
    },
    get: (key:string, callback: Function) => {
      console.log(key + " has been retrieved");
      const err = null, response = "foo";
      callback(err, response);
    },
    del: (key:string) => {
      console.log(key + " has been removed");
    },
    quit: () => {},
    rpush: (key:string, value:string) => {
      console.log("RPUSH " + key + ":" + value);
    },
  }
};