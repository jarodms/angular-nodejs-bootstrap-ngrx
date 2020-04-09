import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo';
import { State, selectVisibleTodos } from '../reducers';
import { loadTodos, addTodo, deleteTodo, completeTodo } from '../actions/todo.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Observable<Todo[]>;
  newTodo = new Todo();

  constructor(private store: Store<State>) {
    this.todos = store.pipe(select(selectVisibleTodos));
  }

  ngOnInit() {
    this.store.dispatch(loadTodos({}));
  }

  addToDo() {
    this.newTodo.status = 'todo';
    this.store.dispatch(addTodo({todo: this.newTodo}));
    this.newTodo = new Todo();
  }

  deleteTodoById(todo: Todo) {
      const theTodo = {...todo};
      // console.log(theTodo);
      this.store.dispatch(deleteTodo({ todo: theTodo}));
  }

  setComplete(todo: Todo) {
    const theTodo = {...todo};
    // console.log(theTodo);
    theTodo.status = 'done';
    this.store.dispatch(completeTodo({ todo: theTodo}));
  }
}
