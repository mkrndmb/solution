import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bodyData: {},
  unread: {},
};

export const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    getBodyData: (state, action) => {
      state.bodyData = action.payload;
    },
    getTotalData: (state, action) => {
      state.unread = action.payload;
    },
  }
});

export const {
  getBodyData,
  getTotalData,
} = mailSlice.actions;

//https://flipkart-email-mock.now.sh/?page=1

export const fetchBodyData = (id) => async (dispatch) => {
  try {
    await axios
      .get(`https://flipkart-email-mock.vercel.app/?id=${id}`)
      .then((response) => dispatch(getBodyData(response.data)));
  } catch (e) {
    return console.log(e);
  }
};

export const fetchTotalData = () => async (dispatch) => {
  try {
    await axios
      .get(`https://flipkart-email-mock.vercel.app`)
      .then((response) => {
        const res = response.data.list.map(item=>{return {...item,hasRead:false,isFav:false}})
        dispatch(getTotalData({res}));
      
      });
  } catch (e) {
    return console.log(e);
  }
};


export default mailSlice.reducer;
