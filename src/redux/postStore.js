import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allPost:[
      ],
      currentTab:null,
      pageReloaded:true,
      activeTab:localStorage.getItem("active-tab")
      ? JSON.parse(localStorage.getItem("active-tab")).current
      : "All Posts",
      isModalOpen:false
    
    
}


const postSlice=createSlice({
    name:"postStore",
    initialState,
    reducers:{
        setAllPost(state,action){
            state.allPost=action.payload
        },
        setCurrentTab(state,action){
            state.currentTab=action.payload
        },
        setPageReloaded(state,action){
            state.pageReloaded=action.payload
        },
        setActiveTab(state,action){
            state.activeTab=action.payload
        },
        setIsModalOpen(state,action){
            state.isModalOpen=action.payload
        }
        
    }
})

export const postAction=postSlice.actions;

export default postSlice;