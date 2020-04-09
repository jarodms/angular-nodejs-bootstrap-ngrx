import { on, createReducer, Action } from '@ngrx/store';
import { Todo } from '../Todo';
import { loadTodosSuccess, addTodoSuccess, deleteTodoSuccess, completeTodoSuccess } from '../actions/todo.actions';


export const todosFeatureKey = 'todos';

export interface TodoState {
  todos: Array<Todo>;
}

export const initialState: TodoState = {
  todos: []
};

const todoReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (state, action) => ({ ...state, todos: action.data })),
  on(addTodoSuccess, (state, {todo}) => ({ ...state, todos: [...state.todos, todo] })),
  on(deleteTodoSuccess, (state, {todo}) => ({ ...state, todos: state.todos.filter(item => item.id !== todo.id) })),
  on(completeTodoSuccess, (state, {todo}) => ({ ...state, todos: state.todos.map(todoItem => {
      if (todoItem.id === todo.id) {

        return Object.assign({}, todo, {
          status: 'done'
        });
      }
      return todoItem;
    })
  })),
);

export function reducer(state: TodoState | undefined, action: Action) {
  return todoReducer(state, action);
}
