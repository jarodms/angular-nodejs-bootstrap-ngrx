import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { TodosService } from '../services/todos.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosComponent ],
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [
        TodosService,
        HttpClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
