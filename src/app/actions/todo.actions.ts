import { createAction, props } from '@ngrx/store';
import { Todo } from '../Todo';


export const loadTodos = createAction(
  '[Todo] Load Todos',
  props<{}>()
);

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ data: Array<Todo> }>()
);

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: Todo }>()
);

export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: Todo }>()
);

export const completeTodo = createAction(
  '[Todo] Complete Todo',
  props<{ todo: Todo }>()
);

export const completeTodoSuccess = createAction(
  '[Todo] Complete Todo Success',
  props<{ todo: Todo }>()
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ todo: Todo }>()
);

export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ todo: Todo }>()
);
