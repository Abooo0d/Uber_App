import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
const Form = () => {
  let token = localStorage.getItem("TOKEN");
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", code: "" });
  const [login, setLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (token !== undefined || token !== null) navigate("/");
  }, []);

  const handelSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axiosClient
      .post("login", {
        email: data.email,
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setLogin(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        alert(error.response.data.message);
      });
  };
  const handelVerify = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axiosClient
      .post("/login/verify", {
        email: data.email,
        login_code: data.code,
      })
      .then((data) => {
        setIsLoading(false);
        localStorage.setItem("TOKEN", data.dat.token);
        navigate("/");
      })
      .catch((error) => {
        s;
        console.log(error);
        setIsLoading(false);
        alert(error.response.data.message);
      });
  };
  return (
    <>
      <div className="flex h-[100vh] items-center flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="bg-white rounded-lg p-20 shadow-xl w-[450px]">
          {login ? (
            <>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Login To your Email
                </h2>
              </div>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => {
                          setData({ ...data, email: e.target.value });
                        }}
                        placeholder="johndoe@example.com"
                        required
                        autoComplete="email"
                        className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={(e) => handelSubmit(e)}
                    >
                      {isLoading && (
                        <HashLoader
                          color="#ffffff"
                          size={30}
                          className="mr-4"
                        />
                      )}
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Verify Your Email
                </h2>
              </div>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div>
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Verification Code
                    </label>
                    <div className="mt-2">
                      <input
                        id="code"
                        name="code"
                        type="text"
                        value={data.code}
                        onChange={(e) => {
                          setData({ ...data, code: e.target.value });
                        }}
                        placeholder="123456"
                        required
                        className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={(e) => handelVerify(e)}
                    >
                      {isLoading && <HashLoader color="#ffffff" size={30} />}
                      Verify
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
