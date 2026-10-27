# 08-State-Management - Redux Toolkit (RTK)

Welcome to this comprehensive guide on **Redux Toolkit**. This module is designed to take you from a complete beginner to an industry-level expert.

---

## 1. Concept Introduction
Redux is a pattern and library for managing and updating global application state. **Redux Toolkit (RTK)** is the official, opinionated, battery-included toolset for efficient Redux development.

---

## 2. Why It Exists
Classic Redux required too much boilerplate code (action types, creators, reducers, store configuration, immutable copy patterns) which was confusing and hard to scale. RTK exists to simplify Redux.

---

## 3. Problem It Solves
It eliminates boilerplates, sets up standard middlewares (like `redux-thunk`), configures store creation automatically, and integrates **Immer** so you can write mutative-looking state code safely.

---

## 4. Internal Working
Under the hood, RTK uses:
*   **configureStore():** Automatically adds Redux DevTools extension support and `redux-thunk` middleware.
*   **createSlice():** Groups action creators and reducers together.
*   **Immer library:** Wraps state in a Proxy, allowing you to write `state.value = 5` and converting it behind the scenes to an immutable write.

---

## 5. Architecture Diagram
```
[ React Component ] --( Dispatch Action )--> [ Redux Slice Reducer ]
        ^                                               |
        |                                       ( Mutate via Immer )
        |                                               v
[ useSelector Hook ] <--- ( Update Store State ) <--- [ Global Store ]
```

---

## 6. Complete Syntax
```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';
```

---

## 7. Beginner Example (Counter Slice)
```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';

// 1. Create Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; }, // Mutative style ok due to Immer
    decrement: (state) => { state.value -= 1; }
  }
});

export const { increment, decrement } = counterSlice.actions;

// 2. Configure Store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});
```

---

## 8. Intermediate Example (Redux Hooks Integration in React)
```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

export default function CounterApp() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

---

## 9. Advanced Example (Async Actions with createAsyncThunk)
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Create Async Thunk
export const fetchUser = createAsyncThunk(
  'user/fetchStatus',
  async (userId) => {
    const response = await fetch(`https://api.example.com/user/${userId}`);
    return await response.json();
  }
);

// 2. Slice handles extraReducers for promise lifecycles
const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default userSlice.reducer;
```

---

## 10. Real World Example (Auth Slice)
```javascript
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, user: null, token: null },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
```

---

## 11. Production Example (Full Store setup with persist config and logging)
```javascript
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import counterReducer from './counterSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents warning alerts for non-serialized class methods
    }),
});
```

---

## 12. Folder Structure
```
src/
├── app/
│   └── store.js
└── features/
    ├── counter/
    │   └── counterSlice.js
    └── auth/
        └── authSlice.js
```

---

## 13. Interview Questions
- **Q1:** What is thunk in Redux?\n  *Answer:* Middleware that allows actions to return a function instead of a standard action object, useful for asynchronous operations.
- **Q2:** How does Immer work in RTK?\n  *Answer:* Immer uses JS Proxies to track mutations made on a draft state, and outputs a copy containing only the changes.

---

## 14. Common Mistakes
- **Mistake:** Accessing global state outside `useSelector`.
- **Solution:** Always fetch state within the component scope using `useSelector`.

---

## 15. Best Practices
- Organize store items under `features/` directory slices.
- Do not store complex class instances or functions inside store state. Keep state serializable.
