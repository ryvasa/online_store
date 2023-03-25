import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({});
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setMessage("");
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const signup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", inputs);
      setId(response.data.id);
    } catch (error) {
      setMessage(error.response.data.message);
      console.log(error);
    }
  };
  const getFirstToken = async () => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:5000/first/${id}`);
        localStorage.setItem("token", JSON.stringify(response.data.token));

        if (response) {
          const response = await axios.get(`http://localhost:5000/me`);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  useEffect(() => {
    getFirstToken();
  }, [id]);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [id, data, user]);
  return (
    <div className="hero min-h-screen relative bg-base-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0"
      >
        <path
          fill="#0D9488"
          fill-opacity="1"
          d="M0,32L40,53.3C80,75,160,117,240,117.3C320,117,400,75,480,96C560,117,640,203,720,250.7C800,299,880,309,960,288C1040,267,1120,213,1200,165.3C1280,117,1360,75,1400,53.3L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
      <div className="hero-content block lg:flex">
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-5xl font-bold text-teal-600">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="w-full flex-1 flex justify-center">
          <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <div className="card-body">
              {message && (
                <div className="flex w-full justify-center bg-red-200 rounded-lg p-2">
                  <div className="text-red-700">{message}</div>
                </div>
              )}
              <div className="flex flex-row gap-5">
                <div className="flex-1 flex flex-col">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      name="name"
                      onChange={handleChange}
                      type="text"
                      placeholder="username"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      name="email"
                      onChange={handleChange}
                      type="email"
                      placeholder="email"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      name="phone"
                      onChange={handleChange}
                      type="number"
                      placeholder="phone"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Gender</span>
                    </label>
                    <select
                      onChange={handleChange}
                      name="gender"
                      className="input input-bordered"
                    >
                      <option disabled selected>
                        Select Gender
                      </option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                    </select>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      name="password"
                      onChange={handleChange}
                      type="password"
                      placeholder="password"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      name="confirmPassword"
                      onChange={handleChange}
                      type="password"
                      placeholder="confirm password"
                      className="input input-bordered"
                    />
                  </div>
                  <Link to={"/signin"} className="text-sm pt-3">
                    Have an account?
                    <span className="text-teal-600"> Sign In here</span>.
                  </Link>
                  <div className="form-control mt-6">
                    <button
                      onClick={signup}
                      className="btn bg-teal-600 hover:bg-teal-500 border-none"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
