import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetchUsersList", async (payload, thunkAPI) => {
  //   const response = axios.post("https://jsonplaceholder.typicode.com/users", { page: 2 });
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  console.log("response in fetch users", response, payload);
  //   jsonplaceholder.typicode.com / users;
  //   return response;
  if (response.status === 200) {
    return thunkAPI.fulfillWithValue(response.data);
  } else {
    return thunkAPI.rejectWithValue([]);
  }
});

const usersSlice = createSlice({
  initialState: { usersList: [] },
  name: "users",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
          console.log("fulfill case", action)
        state.usersList = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log("rejected case", action)
      state.usersList = action.payload;
    })
      .addDefaultCase((state, action) => {
        return {
          usersList: [],
        };
      });
  },
});

export { fetchUsers };

export default usersSlice.reducer;
