import { reducerCases } from "../constants/adminConstants";

const initialState = {
  adminInfo: null,
  adminPanelError: null
  
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case reducerCases.SET_ADMIN_INFO:
      return {
        ...state,
        adminInfo: action.payload,
      };
      case reducerCases.SET_ADMIN_PANEL_ERROR:
      return {
        ...state,
        adminPanelError: action.payload,
      };
    
    default:
      return state;
  }
};

export default adminReducer;