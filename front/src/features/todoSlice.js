import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  error: null,
  loading: false,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3050");
      const todos = await res.json();
      if (todos.error) {
        return thunkAPI.rejectWithValue(todos.error);
      }

      return thunkAPI.fulfillWithValue(todos);
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todow/delete",
  async (data, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3050/" + data.id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const todos = await res.json();
      if (todos.error) {
        return thunkAPI.rejectWithValue(todos.error);
      }
      return thunkAPI.fulfillWithValue(todos);
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const completeTodo = createAsyncThunk(
  "todos/completed",
  async (data, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3050/" + data.id, {
        method: "PATCH",
        body: JSON.stringify({ completed: !data.completed }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const todos = await res.json();
      if (todos.error) {
        return thunkAPI.rejectWithValue(todos.error);
      }
      return thunkAPI.fulfillWithValue(todos);
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addTodo = createAsyncThunk("todos/add", async (data, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3050/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: data.text }),
    });
    const todos = await res.json();

    if (todos.error) {
      return thunkAPI.rejectWithValue(todos.error);
    }

    return thunkAPI.fulfillWithValue(todos);
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loading = false;
      })

      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(completeTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(completeTodo.pending, (state, action) => {
        state.error = null;
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.meta.arg.id) {
            todo.loading = true;
          }
          return todo;
        });
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            todo.completed = !todo.completed;
            todo.loading = false;
          }
          return todo;
        });
      })

      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => {
          return todo._id !== action.payload._id;
        });
      })

      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(deleteTodo.pending, (state, action) => {
        state.error = null;
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.meta.arg.id) {
            todo.loading = true;
          }
          return todo;
        });
      });
  },
});
export default todosSlice.reducer;
