import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        allUsers:[]
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setAllUsers:(state,action)=>{
            state.allUsers=action.payload;
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        }
    }

});

export const {setUser,setLoading,setAllUsers}=authSlice.actions;
export default authSlice.reducer;