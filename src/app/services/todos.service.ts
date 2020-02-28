import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Todo } from '../Todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  });
  options = {
    headers: this.httpHeaders
  };

  constructor(private httpClient: HttpClient) { }

  getTodos() {
    return this.httpClient.get(`${environment.api}/todos`).pipe(catchError(this.handleError));
  }

  addTodo(todo: Todo) {
    console.log(todo);
    return this.httpClient.post(`${environment.api}/todo`, todo).pipe(catchError(this.handleError));
  }

  deleteTodo(todo: Todo) {
    console.log('deleteTodo service: ' + todo.id);
    return this.httpClient.delete(`${environment.api}/todo/${todo.id}`).pipe(catchError(this.handleError));
  }

  completeTodo(todo: Todo) {
    console.log(todo);
    return this.httpClient.put(`${environment.api}/todo`, todo).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }

}
