import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { TodoState, reducer } from './todos.reducer';


export interface State {
  todos: TodoState;
}

export const reducers: ActionReducerMap<State> = {
  todos: reducer
};

export const selectAllTodos = (state: State) => state.todos;

export const selectVisibleTodos = createSelector(
  selectAllTodos,
  state => [...state.todos]
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
