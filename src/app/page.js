"use client";
import React, { useState } from "react";
import Login from "./layouts/Login";
import { login } from "./services/auth";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "./hook/useAuthRedirect";
import { setToken } from "./utils/token";

const LoginPage = () => {
  useAuthRedirect();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      setSubmitButton(true);
      const response = await login({ email, password });
      // Simpan token ke cookie
      setToken(response.access_token);
      setError(""); // Reset error setelah berhasil
      if(response.user.role !== "admin"){
        router.push("/user/dashboard");
      }else{
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setSubmitButton(false);
    }
  };

  return (
    <Login>
      <form className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto" onSubmit={handleSubmit}>
        <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">Login</h2>
        <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">HRIS</div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="intro-x mt-8">
          <input type="text" className="intro-x login__input form-control py-3 px-4 block" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="intro-x login__input form-control py-3 px-4 block mt-4" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
          {submitButton ? (
            <button
              type="submit"
              className="btn btn-primary w-full xl:w-32 xl:mr-3 align-top loading relative unique-loading-btn"
              disabled
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <span className="text" style={{ visibility: "hidden" }}>
                Loading
              </span>
              <div className="submit"></div>
            </button>
          ) : (
            <button type="submit" className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">
              Login
            </button>
          )}
        </div>
      </form>
    </Login>
  );
};

export default LoginPage;
