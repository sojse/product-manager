import Button from "./Button.jsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const userAuth = useAuth();

  function inputChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    userAuth.signIn(form);
    setForm({ username: "", password: "" });
  }

  return (
    <div className="m-4">
      <Link to="/">
        <Button color={"light"}> Back to home</Button>
      </Link>
      <div>
        {userAuth.signedIn ? (
          <section>
            <h2 className="text-2xl font-bold m-4">
              Hello {userAuth.auth.user}!
            </h2>
          </section>
        ) : (
          <form className="m-6" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                type="text"
                className="border-2 rounded-md p-1"
                placeholder="Enter user name"
                name="username"
                id="username"
                value={form.username}
                onChange={inputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                className="border-2 rounded-md p-1"
                placeholder="Enter password"
                name="password"
                id="password"
                value={form.password}
                onChange={inputChange}
              />
            </div>
            <Button color="bright">Sign in</Button>
          </form>
        )}
      </div>
      {userAuth.informationMessage && (
        <span>{userAuth.informationMessage}</span>
      )}
    </div>
  );
}

export default Login;
