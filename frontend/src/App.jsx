import React, { useEffect } from "react";
import Homepage from "./pages/Homepage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Alltasks from "./pages/Alltasks";
import Imptasks from "./pages/Imptasks";
import Completedtasks from "./pages/Completedtasks";
import Pendingtasks from "./pages/Pendingtasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login())
    }
    else if (isLoggedIn === false) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="bg-teal-900 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Homepage />}>
          <Route index element={<Alltasks />} />
          <Route path="/imp" element={<Imptasks />} />
          <Route path="/completed" element={<Completedtasks />} />
          <Route path="/pending" element={<Pendingtasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
