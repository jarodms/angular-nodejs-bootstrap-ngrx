import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';
import { loadTodos, loadTodosSuccess, addTodo, addTodoSuccess,
         deleteTodoSuccess, deleteTodo, completeTodo, completeTodoSuccess } from '../actions/todo.actions';
import { TodosService } from '../services/todos.service';


@Injectable()
export class LoadTodoEffects {
  @Effect()
  loadCurrentTodos$: Observable<any> = this.actions$.pipe(
    ofType(loadTodos),
    mergeMap(() =>
      this.todosService.getTodos().pipe(
        // If successful, dispatch success action with result
        map(data => loadTodosSuccess({ data })),
        // If request fails, dispatch failed action
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  saveCurrentTodos$: Observable<any> = this.actions$.pipe(
    ofType(addTodo),

    mergeMap(data =>
      this.todosService.addTodo(data.todo).pipe(
        // If successful, dispatch success action with result
        switchMap(() => [
          addTodoSuccess({todo: data.todo}),
          // After adding, re-load because the service adds the ID to the todo
          //  TODO: Better way?
          loadTodos({})
         ]
        ),
        // If request fails, dispatch failed action
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  deleteCurrentTodos$: Observable<any> = this.actions$.pipe(
    ofType(deleteTodo),
    mergeMap(data =>
      this.todosService.deleteTodo(data.todo).pipe(
        // If successful, dispatch success action with result
        map(() => deleteTodoSuccess({todo: data.todo})),
        // If request fails, dispatch failed action
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  completeCurrentTodos$: Observable<any> = this.actions$.pipe(
    ofType(completeTodo),
    mergeMap(data =>
      this.todosService.completeTodo(data.todo).pipe(
        // If successful, dispatch success action with result
        map(() => completeTodoSuccess({todo: data.todo})),
        // If request fails, dispatch failed action
        catchError(() => EMPTY)
      )
    )
  );

  constructor(private actions$: Actions, private todosService: TodosService) {}
}
