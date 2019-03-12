/**
 * 定义返回列表的分页信息，泛型
 */
export interface BasePagination<T> {
  content: T[];
  comments?: T[];
  first?: boolean;
  last?: boolean;
  number: number;
  numberOfElements?: number;
  size: number;
  sort?: any;
  totalElements?: number;
  totalPages: number;

}
