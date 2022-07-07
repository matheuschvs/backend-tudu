export interface IListTodoDTO {
  user_id: string;
  status: 'WAITING' | 'DONE' | undefined;
  limit: number;
  offset: number;
}
