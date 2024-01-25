import { createSlice } from "@reduxjs/toolkit";

type userLoggedinChecker = {
    authorized: boolean,
    userid: number | null,
    username : string,
    pfp: string,
    aboutyou: string,
    email:string
}

const initialState: userLoggedinChecker = {
    authorized: false,
    userid: 0,
    username : '',
    pfp: '',
    aboutyou: '',
    email:''
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        newuser(state, action) {
            state.authorized = true;
            state.userid = action.payload.id;
            state.username = action.payload.username;
            state.aboutyou = action.payload.aboutyou;
            state.pfp = action.payload.pfp;
            state.email = action.payload.email;
        },
        clearuser(state) {
            state.authorized = false;
            state.userid = 0;
            state.username = '';
            state.aboutyou = '';
            state.pfp = '';
            state.email = '';
        },
        updateuser(state,action) {
            state.email = action.payload.email;
            state.aboutyou = action.payload.aboutyou;
            state.pfp = action.payload.pfp;
        }
    },
});

export const {newuser,clearuser, updateuser} = userSlice.actions;
export default userSlice.reducer;

