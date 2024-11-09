import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (Data.password === "" || Data.username === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/log-in",
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-teal-950">
        <div className="text-2xl font-bold mb-4">Login</div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="bg-teal-700 px-3 py-2 my-3 w-full rounded"
          onChange={change}
          value={Data.username}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="bg-teal-700 px-3 py-2 my-3 w-full rounded"
          onChange={change}
          value={Data.password}
          required
        />
        <div className="w-full flex justify-between items-baseline">
          <button
            className="mt-4 px-3 py-2 bg-teal-800 rounded text-lg font-semibold"
            onClick={submit}
          >
            Login
          </button>
          <div className="text-sm">
            Not having an account? &nbsp;{" "}
            <Link to={"/signup"} className="underline hover:underline-offset-2">
              {" "}
              Signup here{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
