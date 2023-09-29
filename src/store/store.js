import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";

// export const store = configureStore({
//   reducer: {
//     home: homeSlice,
//   },
// });
// file: todos/todosReducer.ts noEmit
// import type { Reducer } from '@reduxjs/toolkit'
// declare const reducer: Reducer<{}>
// export default reducer

// file: visibility/visibilityReducer.ts noEmit
// import type { Reducer } from '@reduxjs/toolkit'
// declare const reducer: Reducer<{}>
// export default reducer

// file: store.ts
// import { configureStore } from "@reduxjs/toolkit";

// We'll use redux-logger just as an example of adding another middleware
import logger from "redux-logger";

// And use redux-batched-subscribe as an example of adding enhancers
// import { batchedSubscribe } from "redux-batched-subscribe";

const reducers = {
  home: homeSlice,
};

const preloadedState = {
  todos: [
    {
      text: "Eat food",
      completed: true,
    },
    {
      text: "Exercise",
      completed: false,
    },
  ],
  visibilityFilter: "SHOW_COMPLETED",
};

// const debounceNotify = _.debounce((notify) => notify());

// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//   devTools: process.env.NODE_ENV !== "production",
//   preloadedState,
// });

export const store = configureStore({
  reducer: reducers,
});

// import { configureStore } from "@reduxjs/toolkit";
// import moviesReducer from "./movies/movieSlice";

// export const store = configureStore({
//   reducer: { home: homeSlice },
// });
