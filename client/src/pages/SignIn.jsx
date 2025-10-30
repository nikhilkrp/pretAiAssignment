import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const SignIn = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "login") {
        const res = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          setMessage("Login successful");
          console.log("Login response:", res.data);
          navigate("/dashboard");
        } else {
          setMessage(res.data.message || "Invalid credentials");
        }
      } else {
        const res = await api.post("/auth/signup", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          setMessage("Account created successfully");
          console.log("Signup response:", res.data);
          navigate("/dashboard");
        } else {
          setMessage(res.data.message || "Signup failed");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-bold">
        {state === "login" ? "Login" : "Sign up"}
      </h1>
      <p className="text-blue-500 text-xl mt-2">
        Please sign in to continue
      </p>

      {state !== "login" && (
        <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-6 gap-2">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border-none outline-none ring-0"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-6 gap-2">
        <input
          type="email"
          name="email"
          placeholder="Email id"
          className="border-none outline-none ring-0"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center mb-6 mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-6 gap-2">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border-none outline-none ring-0"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full h-11 rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity"
      >
        {state === "login" ? "Login" : "Sign up"}
      </button>

      <p
        onClick={() =>
          setState((prev) => (prev === "login" ? "register" : "login"))
        }
        className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
      >
        {state === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <span className="text-blue-500 hover:underline">click here</span>
      </p>

      {message && <p className="text-gray-700 mb-4">{message}</p>}
    </form>
  );
};

export default SignIn;

