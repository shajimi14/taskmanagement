import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (Data.email === "" || Data.password === "" || Data.username === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          Data
        );
        setData({ username: "", email: "", password: "" });
        alert(response.data.message);
        history("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-teal-950">
        <div className="text-2xl font-bold mb-4">Signup</div>
        <input
          type="text"
          placeholder="Username"
          className="bg-teal-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-teal-700 px-3 py-2 my-3 w-full rounded"
          name="email"
          value={Data.email}
          onChange={change}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-teal-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          value={Data.password}
          onChange={change}
          required
        />
        <div className="w-full flex justify-between items-baseline">
          <button
            className="mt-4 px-3 py-2 bg-teal-800 rounded text-lg font-semibold"
            onClick={submit}
          >
            Signup
          </button>
          <div className="text-sm">
            Already have an account? &nbsp;{" "}
            <Link to={"/login"} className="underline hover:underline-offset-2">
              {" "}
              Login here{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
