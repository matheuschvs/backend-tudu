export interface IUpdateTodoTaskDTO {
  title: string;
  status: 'WAITING' | 'DONE';
  todo_id: string;
  task_id: string;
}
