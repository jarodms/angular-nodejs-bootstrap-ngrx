import { Action } from '@ngrx/store';
import { Todo } from '../Todo';
import { TodoActionTypes, TodoActions } from '../actions/todo.actions';


export const todosFeatureKey = 'todos';

export interface TodoState {
  todos: Array<Todo>;
}

export const initialState: TodoState = {
  todos: []
};

export function todoReducer(state = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case TodoActionTypes.AddTodo:
      return {...state, todos: [...state.todos, action.todo]};

    case TodoActionTypes.CompleteTodo:
      // console.log(action.todo);

      return {...state, todos: state.todos.map(todoItem => {
                    if (todoItem.id === action.todo.id) {
                      return Object.assign({}, action.todo, {
                        status: 'done'
                      });
                    }
                    return todoItem;
                  })
            };


    case TodoActionTypes.DeleteTodo:
      // console.log(action.todo);
      return {...state, todos: state.todos.filter(item => item.id !== action.todo.id)};

    case TodoActionTypes.LoadTodosSuccess:
      // console.log(action.payload);
      return {...state, todos: [...action.payload.data]};

    default:
      return state;
  }
}
