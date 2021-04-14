import HomeGenerateService from "./HomeGenerateService";

describe("home generate Service", () => {
  
  it("deve salvar o conteúdo na base de dados", () => {
    const mockDel = jest.fn();
    const mockRpush = jest.fn();
    const mockQuit = jest.fn();
    const clientFactory = () => {
      return {
        del: mockDel,
        rpush: mockRpush,
        quit: mockQuit
      }
    };
    const service = new HomeGenerateService(clientFactory);
    const listToSave = [
      {
          "title": "23:59",
          "custom_excerpt": null,
          "slug": "23-59",
          "html": "<p>content</p>",
          "tags": [],
          "url": "https://amosbatista-blog.herokuapp.com/23-59/"
      },
      {
          "title": "Théo aos 15",
          "custom_excerpt": null,
          "slug": "theo-aos-15",
          "html": "<p>content</p>",
          "tags": [],
          "url": "https://amosbatista-blog.herokuapp.com/theo-aos-15/"
      }
    ];

    service.saveList(listToSave);

    expect(mockDel).toBeCalled();
    expect(mockRpush).toBeCalledTimes(2);
    expect(mockQuit).toBeCalled();
  });
});