import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { TodoActionTypes, AddTodo, AddTodoSuccess, LoadTodos, LoadTodosSuccess,
  LoadTodosFailure, CompleteTodoSuccess, CompleteTodo, DeleteTodoSuccess, DeleteTodo } from '../actions/todo.actions';
import { TodosService } from '../services/todos.service';

@Injectable()
export class SaveTodoEffects {
  @Effect()
  saveCurrentTodos$: Observable<any> = this.actions$.pipe(
    ofType(TodoActionTypes.AddTodo),

    mergeMap(data =>
      this.todosService.addTodo(data.todo).pipe(
        // If successful, dispatch success action with result
        map(data => new AddTodoSuccess(data)),
        // If request fails, dispatch failed action
        catchError(() => EMPTY)
      )
    )
  );

  constructor(private actions$: Actions<AddTodo>, private todosService: TodosService) {}
}

@Injectable()
export class LoadTodoEffects {
  @Effect()
  loadCurrentTodos$: Observable<any> = this.actions$.pipe(
    ofType(TodoActionTypes.LoadTodos),
    mergeMap(() =>
      this.todosService.getTodos().pipe(
        // If successful, dispatch success action with result
        map(data => new LoadTodosSuccess({ data })),
        // If request fails, dispatch failed action
        catchError(err => of(new LoadTodosFailure(err)))
      )
    )
  );

  constructor(private actions$: Actions<LoadTodos>, private todosService: TodosService) {}
}

@Injectable()
export class CompleteTodoEffects {
  @Effect()
  completeCurrentTodos$: Observable<any> = this.actions$.pipe(
    ofType(TodoActionTypes.CompleteTodo),
    mergeMap(data =>
      this.todosService.completeTodo(data.todo).pipe(
        // If successful, dispatch success action with result
        map(data => new CompleteTodoSuccess({ data })),
        // If request fails, dispatch failed action
        catchError(() => EMPTY)
      )
    )
  );

  constructor(private actions$: Actions<CompleteTodo>, private todosService: TodosService) {}
}

@Injectable()
export class DeleteTodoEffects {
  @Effect()
  deleteCurrentTodos$: Observable<any> = this.actions$.pipe(
    ofType(TodoActionTypes.DeleteTodo),

    mergeMap(data =>
      this.todosService.deleteTodo(data.todo).pipe(
        // If successful, dispatch success action with result
        map(data => new DeleteTodoSuccess(data)),
        // If request fails, dispatch failed action
        catchError(() => EMPTY)
      )
    )
  );

  constructor(private actions$: Actions<DeleteTodo>, private todosService: TodosService) {}
}
