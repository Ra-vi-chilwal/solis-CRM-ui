const initialState = {
    sidebar: true,
  };
  
  const setsidebar = (state = initialState, action) => {
    switch (action.type) {
      case "SET_SIDEBAR":
        return { ...state, sidebar: action.payload };
      default:
        return state;
    }
  };
  
  export default setsidebar;
  
  // sidebarActions.js
//   export const setSidebar = (sidebar) => ({
//     type: "SET_SIDEBAR",
//     payload: sidebar,
//   });
//   In this revised code, I've renamed your reducer to sidebarReducer to avoid conflicts. The action creator is now named setSidebar.
  
//   Now, you can use setSidebar to update the sidebar state and sidebarReducer to handle these actions. Here's how you can use it:
  
//   javascript
//   Copy code
//   import { useDispatch, useSelector } from 'react-redux';
//   import { setSidebar } from './sidebarActions';
  
//   // ...
  
//   const sidebarShow = useSelector((state) => state.sidebar.sidebar);
  
//   const dispatch = useDispatch();
  
//   // To toggle the sidebar
//   onClick={() => dispatch(setSidebar(!sidebarShow))}
//   This way, you can maintain clarity and avoid naming conflicts between your reducer and action creator.
  
  
  
  
  
  