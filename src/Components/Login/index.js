import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
export default function Login() {
  const navigate=useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;

    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const formdata = (e) => {
    e.preventDefault();
    console.log(state);
    //  state = JSON.stringify(state);
    let json = JSON.stringify({
      email: "zain@gmail.com",
      password: "1234567890",
    });
    axios
      .post("http://localhost:4000/adminlogin", json, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((response) => {
        console.log(response.data.token, "data checking ");
         if (response.status=== 200) {
     console.log("Running");
      
  localStorage.setItem('token', response.data.token);
     window.alert("Login Successfully");
       navigate("/GetEmployees");
     } else {
       alert("Invalid username or password");
     }
  
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://d111rsbtkze0ke.cloudfront.net/img/logo.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label
                  htmlFor="email-address"
                  className="text-[blue] font-bold"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={state.email}
                  required
                  className=" px-5 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </div>
              <div className="py-5">
                <label htmlFor="password" className="text-[green] font-bold  ">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={state.password}
                  required
                  onChange={handleChange}
                  className="px-5 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={formdata}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
