import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "./KanbanSlice";
import usersReducer from "./UsersSlice";

const rootReducer = {
  kanban: kanbanReducer,
  users: usersReducer,
};

const store = configureStore({ reducer: rootReducer });

export default store;
