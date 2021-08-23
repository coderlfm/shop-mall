export interface IDataType<T = any> {
  code: number;
  data: T;
  msg: string;
}

export interface ISearchData {
  categoryId?: number;
  keyword?: string;
  page: number;
  pageSize: number;
}
