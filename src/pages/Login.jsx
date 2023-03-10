import React from "react";

const Login = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-gradient-to-b from-gray-300 to-gray-200 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute top-0 "
        >
          <path
            fill="#4F46E5"
            fill-opacity="1"
            d="M0,96L0,128L90,128L90,288L180,288L180,224L270,224L270,128L360,128L360,192L450,192L450,288L540,288L540,288L630,288L630,160L720,160L720,256L810,256L810,192L900,192L900,128L990,128L990,288L1080,288L1080,96L1170,96L1170,32L1260,32L1260,224L1350,224L1350,32L1440,32L1440,0L1350,0L1350,0L1260,0L1260,0L1170,0L1170,0L1080,0L1080,0L990,0L990,0L900,0L900,0L810,0L810,0L720,0L720,0L630,0L630,0L540,0L540,0L450,0L450,0L360,0L360,0L270,0L270,0L180,0L180,0L90,0L90,0L0,0L0,0Z"
          ></path>
        </svg>
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="card flex-shrink-0 w-4/12 h-1/2 shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="flex justify-center items-center text-4xl font-bold text-indigo-600">
                Login
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
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
