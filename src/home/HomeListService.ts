import content from './homeContent.json';

export class HomeListService {

  homeContent: Array<any>;
  pageSize: number;

  constructor (pageSize?: number) {
    this.homeContent = content;
    this.pageSize = pageSize || 3;
  }

  async Load (_page?: number) {
    const page = (!_page || _page < 1) ? 1 : _page;

    return await this.homeContent.slice(
      (page - 1) * this.pageSize,
      page * this.pageSize
    );
  }
}