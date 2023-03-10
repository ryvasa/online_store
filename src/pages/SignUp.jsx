import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
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
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
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
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="text"
                  placeholder="confirm password"
                  className="input input-bordered"
                />
              </div>
              <Link to={"/signin"} className="text-sm pt-3">
                Have an account?
                <span className="text-teal-600"> Sign In here</span>.
              </Link>
              <div className="form-control mt-6">
                <button className="btn bg-teal-600 hover:bg-teal-500 border-none">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
