import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  newTodo = new Todo();

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.getTodos().subscribe(data => (this.todos = data));
  }

  addToDo() {
    this.newTodo.status = 'todo';
    console.log('addToDo: ' + JSON.stringify(this.newTodo));
    this.todosService.addTodo(this.newTodo).then( () => {
      this.todosService.getTodos().subscribe(data => (this.todos = data));
    });
  }

  deleteTodoById(id: number) {
    console.log('deleteTodoById: ' + id);
    this.todosService.deleteTodo(id).then( () => {
      this.todosService.getTodos().subscribe(data => (this.todos = data));
    });
  }

  setComplete(index: number) {
    let theTodo = this.todos[index];
    theTodo.status = 'done';
    console.log('setComplete: ' + JSON.stringify(theTodo));
    this.todosService.completeTodo(theTodo).then( () => {
      this.todosService.getTodos().subscribe(data => (this.todos = data))
    });
  }
}
