import axios from "axios";
import { useEffect, useState } from "react";
import UserModal from "../UserModal";
export default function Employees() {
  const [people, setpeople] = useState([]);
  const [openModel, setopenModel] = useState(false);
  const [classData, setClassData] = useState([]);

  const [state, setState] = useState({
    classId: "",
    Name: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;

    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const apiCall2 = () => {
    axios
      .get("http://localhost:4000/allClass")
      .then((response) => setClassData(response.data.data));
  };

  const handleDialogue = () => {
    setopenModel(true);
  };
  useEffect(() => {
    apiCall2();
  }, []);
  useEffect(() => {
    apiCall();
  }, [state]);

  const apiCall = () => {
    console.log(state, "state");
    axios
      .get("http://localhost:4000/StudentGet", {
        params: {
          name: state.Name,
          classId: state.classId,
        },
      })
      .then((response) => setpeople(response.data.data));
  };

  const succesCallBack = () => {
    apiCall();
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <UserModal
        open={openModel}
        setOpen={setopenModel}
        succesCallBack={succesCallBack}
      />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleDialogue}
          >
            Add user
          </button>
        </div>
      </div>
      <div>
        <div className="flex my-10">
          <div className="w-[50%]">
            <label
              htmlFor="search"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              search by Student
            </label>
            <div className="relative mt-2 flex items-center">
              <input
                type="text"
                name="Name"
                id="Name"
                onChange={handleChange}
                value={state.Name}
                className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>
          <div className="w-[50%] mx-10">
            <label
              htmlFor="search"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              search by Class
            </label>
            <div className="relative mt-2 flex items-center">
              <select
                name="classId"
                id="className"
                value={state.className}
                className="block w-full px-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="MT-02"
                onChange={handleChange}
              >
                <option></option>
                {classData?.map((v, k) => (
                  <option value={v?._id}>{v?.ClassName}</option>
                ))}
              </select>

              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    RollNo
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {people.map((person) => (
                  <tr key={person.email} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.Name}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {person.RollNo}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {person.email}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                      {person?.class?.ClassName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
