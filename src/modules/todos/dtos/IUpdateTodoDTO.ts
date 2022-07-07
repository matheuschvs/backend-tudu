export interface IUpdateTodoDTO {
  title: string;
  description: string;
  deadline: string | Date;
  status: 'WAITING' | 'DONE';
  category_id: string;
  todo_id: string;
}
