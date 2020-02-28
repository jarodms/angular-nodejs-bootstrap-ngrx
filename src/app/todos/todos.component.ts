import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { AddTodo, LoadTodos, CompleteTodo, DeleteTodo } from '../actions/todo.actions';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Array<Todo>;
  newTodo = new Todo();

  constructor(private store: Store<State>) {
    store.select(state => state.todos).subscribe(todos => this.todos = todos.todos);
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodos());
  }

  addToDo() {
    this.newTodo.status = 'todo';
    this.store.dispatch(new AddTodo(this.newTodo));
    this.newTodo = new Todo();
  }

  deleteTodoById(id: number) {
    const theTodo = {...this.todos[id - 1]};
    this.store.dispatch(new DeleteTodo(theTodo));
  }

  setComplete(index: number) {
    const theTodo = {...this.todos[index]};
    theTodo.status = 'done';
    this.store.dispatch(new CompleteTodo(theTodo));
  }
}
