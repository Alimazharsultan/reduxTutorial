import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import {uiActions} from "./store/ui-slice";
let isFirstRender = true;

function App() {
  const cart = useSelector(state=>state.cart);
  const notification = useSelector(state=>state.ui.notification);
  console.log(cart);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const cartitems = useSelector((state)=>state.cart.itemsList);
  const dispatch = useDispatch();
  console.log(useSelector(state => state.auth.notification))
  useEffect(()=>{
    if(isFirstRender){
      isFirstRender = false;
      return;
    }
    
    const sendRequest = async () =>{
      // send state as sending requst
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending Request",
        type: 'warning'
      })); 
    const res = await fetch('https://redux-http-1cacb-default-rtdb.firebaseio.com/cartItems.json',{
      method: 'PUT',
      body: JSON.stringify(cart)
    }
    );
    const data = await res.json();
    //send state as request is successful
    dispatch(uiActions.showNotification({
      open: true,
      message: "Database Request sent successfully",
      type: 'success'
    })); 
  }
  sendRequest().catch(err => {
    // send state as error
    dispatch(uiActions.showNotification({
      open: true,
      message: "Database Request not successful",
      type: 'error'
    })); 
  });
    
  },[cart]);


  return (
    <div className="App">
      <Notification type={notification.type} message={notification.message} />
      { !isLoggedIn && < Auth />}
      { isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
