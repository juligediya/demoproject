import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('/posts', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts' , {method : 'GET'});
    const result = await response.json(); 
    return result;
  });

export const deletePosts=async (id)=>{
    const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {method : 'DELETE'});
    const result = await response.json(); 
    return result;
}

export const createPosts=async (data)=>{
    const response=await fetch(`https://jsonplaceholder.typicode.com/posts`,{method : 'POST',
        body: JSON.stringify(data),
    });
    const result = await response.json(); 
    return result;
}


export const updatePosts=async (id,data)=>{
    const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{method : 'PUT',
        body: JSON.stringify(data),
    });
    const result = await response.json(); 
    return result;
}