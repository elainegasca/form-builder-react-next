import { combineReducers, Reducer } from "@reduxjs/toolkit";
import progressReducer from "./uireducers/progress";
import modalstripReducer from "./uireducers/modalstrip";

export default combineReducers({
  progress: progressReducer,
  modalstrip: modalstripReducer,
});
