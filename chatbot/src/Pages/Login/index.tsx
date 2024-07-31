import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { anonymousLogin, login } from "../../slices/authSlice";

const Login: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (email && password) {
      dispatch(
        login({
          email,
          password,
        })
      );
    }
  };
  const handleAnonymousLogin = async () => {
    dispatch(anonymousLogin());
  };
  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center py-8 px-4 gap-6">
      <img
        className="w-20 h-20 rounded-full"
        src="./lawyer.jpeg"
        alt="lawyer"
      />
      <p className="text-white font-medium text-xl">Log in to Chatbot</p>

      <input
        value={email}
        className="focus:border-blue focus:border-2 focus:border-solid w-full max-w-md h-10 rounded-md p-3"
        placeholder="Enter your email address"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        value={password}
        className="focus:border-blue focus:border-2 focus:border-solid w-full max-w-md h-10 rounded-md p-3"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={() => handleLogin()}
        className="bg-maroon rounded-md w-full max-w-md h-10 text-white"
      >
        LOGIN
      </button>

      <button
        onClick={() => handleAnonymousLogin()}
        className="bg-lightblue rounded-md w-full max-w-md h-10 text-white"
      >
        ANONYMOUS
      </button>

      <div className="flex flex-row items-center gap-2">
        <p className="text-white">Don't have an account?</p>
        <Link to="/register" className="text-lightblue font-medium">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
