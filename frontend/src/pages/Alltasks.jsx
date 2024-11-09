import React, { useState, useEffect } from "react";
import Cards from "../components/Homepage/Cards";
import { IoMdAddCircle } from "react-icons/io";
import InputData from "../components/Homepage/InputData";
import axios from "axios";

const Alltasks = () => {
  const [Inputdiv, setInputdiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });
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
  });
  return (
    <>
      <div>
        <div className="w-full flex justify-end">
          <button onClick={() => setInputdiv("fixed")}>
            <IoMdAddCircle className="text-4xl mb-4 text-teal-400 hover:text-teal-200 hover:scale-105 transition-all duration-150" />
          </button>
        </div>
        {Data && (
          <Cards
            home={"true"}
            setInputdiv={setInputdiv}
            data={Data.tasks}
            setUpdatedData={setUpdatedData}
          />
        )}
        <InputData
          Inputdiv={Inputdiv}
          setInputdiv={setInputdiv}
          UpdatedData={UpdatedData}
          setUpdatedData={setUpdatedData}
        />
      </div>
    </>
  );
};

export default Alltasks;
