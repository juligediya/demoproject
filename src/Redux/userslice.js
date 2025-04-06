import {  createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../API/API";



const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    isAuth:''
  },
  reducers: {
    login(state, action) {
      const { email, password } = action.payload;
      state.users.map((item) => {
        if (item.email === email) {
          console.log('yes')
          if (item.password === password) {
            console.log('haa')
            state.isAuth=true;
            localStorage.setItem('login',state.isAuth)
          }
        }
      });
    },
    signup(state, action) {
      state.users.push(action.payload);

    },
    logout(state, action) {
      state.isAuth=false;
      localStorage.setItem('login',state.isAuth)
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
    },
    deletePost(state,action){
        state.posts.map((item)=>item.id!==action.payload)
        
    },
    updatePost(state,action){
        const updatedPost=state.posts.findIndex((item)=>item.id===action.payload.id)
        state.posts.splice(updatedPost,1,action.payload)
    
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
