import { createSlice } from "@reduxjs/toolkit";

type oneComment = {
    id: number;
    body: string;
    postid: number;
    userid: number;
    created_at: string;
    updated_at: string;
    username: string;
}


const initialState:  oneComment[] = [];


const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        allcomments(state,action){
             return action.payload
        },
        addcommments(state,action){
             state[state.length] = action.payload
        },
        delcomment(state,action){
             return state.filter((comment)=>comment.id !== action.payload)
        },
        updateComment(state,action){
            return state.map((comment)=>{if(comment.id === action.payload.id){return action.payload}else{return comment}
            })
        },
        clearComments(state) {
            state = [];
        },
    },
});

export const {allcomments, delcomment, updateComment, clearComments, addcommments} = commentsSlice.actions;
export default commentsSlice.reducer;