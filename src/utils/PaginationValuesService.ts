export default ( _page?: number, _pageSize?: number) => {
  const page = (!_page || _page < 1) ? 1 : _page;
  const pageSize = (!_pageSize || _pageSize < 1) ? 1 : _pageSize;

  return {
    takeFrom: (page - 1) * pageSize,
    takeTo: (page * pageSize) -1
  };
}