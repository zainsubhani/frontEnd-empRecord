import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const [openModel, setopenModel] = useState(false);

  const openModelD = () => {
    setopenModel(true);
  };
  const [data, setData] = useState(0);

  const getState = () => {
    axios
      .get("http://localhost:4000/findClass")
      .then((response) => setData(response.data.classcount))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getState();
  }, []);
  const navigate = useNavigate();
  const succesCallBack = () => {
    getState();
  };

  return (
    <div className="flex bg-indigo-700 justify-center items-center h-screen">
      <Modal
        open={openModel}
        setOpen={setopenModel}
        succesCallBack={succesCallBack}
      />

      <div className="bg-indigo-700 w-screen">
        <div className="py-24 px-6 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Maintain Your Employee Data.
              <br />
              Start using our app today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200">
              Easy for every company and their employees to maintain your record
              everytime. you can add Record <br /> Get Record <br /> Filter
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                onClick={openModelD}
                className=" cursor-pointer rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Add Department
              </a>
              <button
                disabled={data < 1}
                className={` text-sm font-semibold bg-[blue] px-3.5 py-2.5
                rounded-md shadow-md leading-6 text-white ${
                  data < 1 && "brightness-50 cursor-not-allowed	"
                }`}
                onClick={() => navigate("/GetEmployees")}
              >
                {" "}
                Get All Employees <span aria-hidden="true">→</span>
              </button>
              <button
                disabled={data < 1}
                className={`  rounded-md bg-[green] px-3.5 py-2.5 text-sm font-semibold text-[white] shadow-sm hover:	 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white 
                ${data < 1 && "brightness-50 cursor-not-allowed	"}`}
              >
                Filter Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
