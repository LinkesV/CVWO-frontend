import { createSlice } from "@reduxjs/toolkit";
type onePost = {
    id: number;
    body: string;
    title: string;
    category:string;
    userid: number;
    created_at: string;
    updated_at: string;
    username: string;
}

type postsCat = onePost[];

const initialState: postsCat = [];


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        allPosts(state,action){
             return action.payload;
        },
        delPost(state,action){
            state = state.filter((post)=>post.id === action.payload)
        },
        updatePost(state,action){
            state = state.map((post)=>{
                if(post.id === action.payload.id){
                    return action.payload
                }else{return post}
            })
        },
        clearPosts(state) {
            state = [];
        },
    },
});

export const {allPosts, updatePost, delPost, clearPosts} = postSlice.actions;
export default postSlice.reducer;