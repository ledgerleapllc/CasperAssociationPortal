export const createReducer =
  (strategies, initialState) =>
  (state = initialState, { type, payload }) =>
    (strategies[type] ?? strategies.__default__)(state, payload);
