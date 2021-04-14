import HomeListService  from "./HomeListService";

describe("home list service", () => {

  it("deve retornar os primeiros itens da lista da home", async () => {
    const expected = [{ foo: "bar1" },{ foo: "bar2" },{ foo: "bar3" },{ foo: "bar4" }];
    const quitFn = jest.fn();
    const lrangeFn = jest.fn((key, start, end, callback) => {
      key; start; end;
      callback(null, expected);
    });

    const clientFactory = () => {
      return {
        quit: quitFn,
        lrange: lrangeFn
      }
    }

    const pageSize = 4;
    const service = new HomeListService(clientFactory, pageSize);
    const actual = await service.Load();

    expect(actual).toBe(expected);
    expect(quitFn).toBeCalled();
    expect(lrangeFn).toBeCalled();
    
  });

  it("deve retornar os itens da página 2 na lista da home", async () => {
    const expected = [{ foo: "bar1" },{ foo: "bar2" },{ foo: "bar3" },{ foo: "bar4" }];
    const quitFn = jest.fn();
    const lrangeFn = jest.fn((key, start, end, callback) => {
      key; start; end;
      callback(null, expected);
    });

    const clientFactory = () => {
      return {
        quit: quitFn,
        lrange: lrangeFn
      }
    }

    const pageSize = 4;
    const service = new HomeListService(clientFactory, pageSize);
    const page = 2;
    const actual = await service.Load(page);

    expect(actual).toBe(expected);
    expect(quitFn).toBeCalled();
    expect(lrangeFn).toBeCalled();
  });

  it("deve retornar erro caso o serviço da home gere erro", async () => {
    const expected = "some error";
    const quitFn = jest.fn();
    const lrangeFn = jest.fn((key, start, end, callback) => {
      key; start; end;
      callback(expected, null);
    });

    const clientFactory = () => {
      return {
        quit: quitFn,
        lrange: lrangeFn
      }
    }

    const pageSize = 4;
    const service = new HomeListService(clientFactory, pageSize);
    await service.Load().catch( actual => {
      expect(actual).toBe(expected);
      expect(quitFn).toBeCalled();
      expect(lrangeFn).toBeCalled();  
    });
  });
}); 