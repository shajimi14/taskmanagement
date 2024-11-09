import React, { useEffect, useState } from "react";
import { BsListTask } from "react-icons/bs";
import {
  MdLabelImportant,
  MdOutlineDoneAll,
  MdRemoveDone,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All tasks",
      icon: <BsListTask />,
      link: "/",
    },
    {
      title: "Important tasks",
      icon: <MdLabelImportant />,
      link: "/imp",
    },
    {
      title: "Completed tasks",
      icon: <MdOutlineDoneAll />,
      link: "/completed",
    },
    {
      title: "Pending tasks",
      icon: <MdRemoveDone />,
      link: "/pending",
    },
  ];

  const [Data, setData] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-teal-400">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center gap-3 hover:bg-teal-500 p-2 rounded cursor-pointer transition-all duration-300"
          >
            {items.icon}
            <span className="text-lg">{items.title}</span>
          </Link>
        ))}
      </div>
      <div>
        <button
          className="w-full bg-teal-600 rounded p-2 hover:bg-red-800 transition-all duration-300"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
