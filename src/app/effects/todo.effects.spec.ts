import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadTodoEffects } from './todo.effects';
import { HttpClientModule } from '@angular/common/http';

describe('LoadTodoEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadTodoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadTodoEffects,
        provideMockActions(() => actions$)
      ],
      imports: [
        HttpClientModule
      ]
    });

    effects = TestBed.get<LoadTodoEffects>(LoadTodoEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
