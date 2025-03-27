import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchPosts = createAsyncThunk('/posts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const result = await response.json(); 
  console.log(result)
  return result;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
  },
  reducers: {
    login(state, action) {
      const { email, password } = action.payload;
      state.users.map((item) => {
        if (item.email === email) {
          if (item.password === password) {
            localStorage.setItem('login', "true");
          }
        }
      });
    },
    signup(state, action) {
      state.users.push(action.payload);
      console.log("new user created");
    },
    logout(state, action) {
        localStorage.setItem('login', "false");
    },
  },
});

const dataSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
  },
  reducers: {
    addPost(state,action){
        state.posts.push(action.payload)
        console.log('added')
    },
    deletePost(state,action){
        state.posts.map((item)=>item.id!==action.payload)
        
    },
    updatePost(state,action){
        const updatedPost=state.posts.findIndex((item)=>item.id===action.payload.id)
        state.posts.splice(updatedPost,1,action.payload)
        console.log('updated')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload; 
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { login, signup, logout } = userSlice.actions;
export const { addPost ,deletePost,updatePost} = dataSlice.actions;
export const userReducer = userSlice.reducer;
export const dataReducer = dataSlice.reducer;
