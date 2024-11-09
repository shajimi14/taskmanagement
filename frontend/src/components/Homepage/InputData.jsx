import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios"

const InputData = ({ Inputdiv, setInputdiv, UpdatedData, setUpdatedData }) => {
  const [Data, setData] = useState({ title: "", desc: "" });
  useEffect(() => {
    setData({ title: UpdatedData.title, desc: UpdatedData.desc });
  }, [UpdatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.post("http://localhost:1000/api/v2/create-task", Data, {
        headers,
      });
      setData({ title: "", desc: "" });
      setInputdiv("hidden");
    }
  };
  const updateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.put(
        `http://localhost:1000/api/v2/update-task/${UpdatedData.id}`,
        Data,
        {
          headers,
        }
      );
      setUpdatedData({ id: "", title: "", desc: "" });
      setData({ title: "", desc: "" });
      setInputdiv("hidden");
    }
  };
  return (
    <>
      <div
        className={`${Inputdiv} top-0 left-0 bg-teal-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${Inputdiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="bg-teal-950 w-2/6 p-4 rounded-xl">
          <div className="flex justify-end mb-4 text-xl">
            <button
              onClick={() => {
                setInputdiv("hidden");
                setData({ title: "", desc: "" });
                setUpdatedData({ id: "", title: "", desc: "" });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 w-full rounded bg-teal-700"
            value={Data.title}
            onChange={change}
          />
          <textarea
            placeholder="Task Description"
            name="desc"
            rows={10}
            cols={30}
            className="px-3 py-2 w-full rounded bg-teal-700 my-2"
            value={Data.desc}
            onChange={change}
          ></textarea>
          {UpdatedData.id === "" ? (
            <button
              className="px-3 py-2 bg-teal-800 rounded text-lg font-semibold"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-teal-800 rounded text-lg font-semibold"
              onClick={updateTask}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
