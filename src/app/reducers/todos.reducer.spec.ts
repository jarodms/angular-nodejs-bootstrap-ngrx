import { todoReducer, initialState } from './todos.reducer';

describe('Todos Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = todoReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
