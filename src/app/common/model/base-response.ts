// 泛型定义响应的返回体内容
export interface BaseResponse<T> {
  code: number;
  data: T;
  msg: string;
  success: boolean;
}
