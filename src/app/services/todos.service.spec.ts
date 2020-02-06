import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';
import { Injector } from '@angular/core';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

const todosService = jasmine.createSpyObj('TodosService', ['getTodos']);

const dummyTodos = [{
  id: 1,
  title: 'test 1',
  description: 'Here is the description 1',
  status: 'todo'
},
{
  id: 2,
  title: 'test 2',
  description: 'Here is the description 2',
  status: 'done'
},
{
  id: 3,
  title: 'test 3',
  description: 'Here is the description 3',
  status: 'todo'
}
];


describe('TodosService', () => {

  let injector: Injector;
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    injector = TestBed.configureTestingModule({
      providers: [
        { provide: TodosService, useValue: todosService }
      ],
      imports: [HttpClientTestingModule]
    });

    service = injector.get(TodosService);
    httpMock = injector.get(HttpTestingController);

  });

  it('should be created', () => {
    const service: TodosService = TestBed.get(TodosService);
    expect(service).toBeTruthy();
  });

  it('should get Todos', () => {
    const service: TodosService = TestBed.get(TodosService);
    todosService.getTodos.and.returnValue(of(dummyTodos));
    expect(service).toBeTruthy();
  });
});
