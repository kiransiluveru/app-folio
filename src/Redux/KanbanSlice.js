import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const kanbanSlice = createSlice({
  initialState: { tasks: [] },
  name: "kanban",
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      const currentTasks = JSON.parse(JSON.stringify(state.tasks));
      const index = _.findIndex(currentTasks, { id: updatedTask.id });
      if (index !== -1) {
        currentTasks[index] = { ...currentTasks[index], ...updatedTask };
        console.log("updatedTask", updatedTask, currentTasks);
        return {
          ...state,
          tasks: currentTasks,
        };
      }
      return state;
    },
  },
  extraReducers: {},
});

export const { addTask, updateTask } = kanbanSlice.actions;

export default kanbanSlice.reducer;
