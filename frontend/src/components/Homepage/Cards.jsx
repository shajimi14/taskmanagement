import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import axios from "axios";

const Cards = ({ home, setInputdiv, data = [], setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleImpTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`, {
        headers,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (id, title, desc) => {
    setInputdiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((items, i) => (
        <div
          key={items._id}
          className="border rounded p-4 bg-teal-950 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-semibold text-xl">{items.title}</h3>
            <p className="my-2">{items.desc}</p>
          </div>
          <div className="flex items-center mt-2">
            <button
              onClick={() => handleCompleteTask(items._id)}
              className={`${
                items.complete === false ? "bg-red-600" : "bg-green-600"
              } p-2 rounded w-1/2`}
            >
              {items.complete === true ? "Completed" : "Pending"}
            </button>
            <div className="w-1/2 p-2 flex justify-around text-xl">
              <button onClick={() => handleImpTask(items._id)}>
                {items.important === false ? (
                  <IoMdHeartEmpty />
                ) : (
                  <IoHeart className="text-red-500" />
                )}
              </button>
              {home === "true" && (
                <button
                  onClick={() =>
                    handleUpdate(items._id, items.title, items.desc)
                  }
                >
                  <FaEdit />
                </button>
              )}
              <button onClick={() => deleteTask(items._id)}>
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      ))}
      {home === "true" && (
        <button
          onClick={() => setInputdiv("fixed")}
          className="border rounded p-4 bg-teal-950 flex flex-col justify-center items-center hover:cursor-pointer hover:scale-105 transition-all duration-200"
        >
          <IoMdAddCircle className="text-5xl mb-4" />
          <div className="text-2xl">Add Task</div>
        </button>
      )}
    </div>
  );
};

export default Cards;
