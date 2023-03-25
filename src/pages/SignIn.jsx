import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SignIn = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const signIn = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signin", inputs);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      if (response) {
        const response = await axios.get(`http://localhost:5000/me`);
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (error) {
      setMessage(error.response.data.message);
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setMessage("");
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="hero min-h-screen bg-base-200">
      <svg
        className="absolute bottom-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0D9488"
          fill-opacity="1"
          d="M0,192L40,202.7C80,213,160,235,240,224C320,213,400,171,480,144C560,117,640,107,720,133.3C800,160,880,224,960,213.3C1040,203,1120,117,1200,80C1280,43,1360,53,1400,58.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center flex-1 lg:text-left">
          <h1 className="text-5xl font-bold text-teal-600">Sign In now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              {message && (
                <div className="flex w-full bg-red-300 justify-center p-2">
                  <div className="text-red-700">{message}</div>
                </div>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  onChange={handleChange}
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <Link to={"/signup"} className="text-sm pt-3">
                Don't have account?{" "}
                <span className="text-teal-600"> Sign Up here</span>.
              </Link>
              <div className="form-control mt-6">
                <button
                  onClick={signIn}
                  className="btn bg-teal-600 hover:bg-teal-500 border-none"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
