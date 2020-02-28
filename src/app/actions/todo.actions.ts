import { Action } from '@ngrx/store';
import { Todo } from '../Todo';

export enum TodoActionTypes {
  LoadTodos = '[Todo] Load Todos',
  LoadTodosSuccess = '[Todo] Load Todos Success',
  LoadTodosFailure = '[Todo] Load Todos Failure',
  AddTodo = '[Todo] Add Todo',
  AddTodoSuccess = '[Todo] Add Todo Success',
  CompleteTodo = '[Todo] Complete Todo',
  CompleteTodoSuccess = '[Todo] Complete Todo Success',
  DeleteTodo = '[Todo] Delete Todo',
  DeleteTodoSuccess = '[Todo] Delete Todo'
}

export class LoadTodos implements Action {
  readonly type = TodoActionTypes.LoadTodos;
}

export class LoadTodosSuccess implements Action {
  readonly type = TodoActionTypes.LoadTodosSuccess;
  constructor(public payload: { data: Array<Todo> }) { }
}

export class LoadTodosFailure implements Action {
  readonly type = TodoActionTypes.LoadTodosFailure;
  constructor(public payload: { error: any }) { }
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.AddTodo;
  constructor(public todo: Todo) {}
}

export class AddTodoSuccess implements Action {
  readonly type = TodoActionTypes.AddTodoSuccess;
  constructor(public todo: Todo) { }
}

export class CompleteTodo implements Action {
  readonly type = TodoActionTypes.CompleteTodo;
  constructor(public todo: Todo) {}
}

export class CompleteTodoSuccess implements Action {
  readonly type = TodoActionTypes.CompleteTodoSuccess;
  constructor(public payload: { data: Array<Todo> }) { }
}

export class DeleteTodo implements Action {
  readonly type = TodoActionTypes.DeleteTodo;
  constructor(public todo: Todo) {}
}

export class DeleteTodoSuccess implements Action {
  readonly type = TodoActionTypes.DeleteTodoSuccess;
  constructor(public todo: Todo) {}
}
export type TodoActions = LoadTodos | LoadTodosSuccess | LoadTodosFailure | AddTodo | CompleteTodo | DeleteTodo | DeleteTodoSuccess;

