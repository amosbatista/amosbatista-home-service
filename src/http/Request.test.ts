import Request from "./Request";

describe.skip("http request service", () => {

  it("deve fazer uma requisição GET com query", async () => {
    const expected = {
      foo: "bar"
    };
    const client = {
      get: jest.fn(),
    }
    const request = new Request(client);
    const url = 'http:\\foo';
    const query = {
      'param1': 'paramValue'
    };
    const actual = await request.Get(url, query);

    expect(actual).toEqual(expected);
  });
});