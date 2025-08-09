import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./Api.js";

// Get all task
export const getTasks = createAsyncThunk('tasks/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/tasks');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "get failed");
    }
});

// Add new task
export const addTask = createAsyncThunk('tasks/add', async (data, thunkAPI) => {
    try {
        const response = await api.post('/tasks', data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message ||"add failed" );
    }
});

// Edit task
export const completeTask = createAsyncThunk('tasks/complete', async (id, thunkAPI) => {
    try {
        const response = await api.patch(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "complete failed");
    }
});

// Delete task
export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
    try {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "delete failed");
    }
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
        success:false
    },
    reducers: {
        resetStatus: (state) => {
            state.success = false;
            state.error = null;
            state.loading= false;
        }
    },
    extraReducers: (builder) => {
        // Get tasks
        builder
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload.data;
                state.success = true;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });

        // Add role
        builder
            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null
                state.success = false;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload.data);
                state.success = true;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });

        // Edit status
        builder
            .addCase(completeTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(completeTask.fulfilled, (state, action) => {
                state.loading = false;
                const updatedTask = action.payload.data;
                const index = state.tasks.findIndex(t => t._id === updatedTask._id);
                if (index !== -1) {
                    state.tasks[index] = updatedTask;
                }
                state.success = true;
            })
            .addCase(completeTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete task
        builder
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter((t) => t._id !== action.payload.data._id);
                state.success = true;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const {resetStatus} = taskSlice.actions;
export default taskSlice.reducer;
