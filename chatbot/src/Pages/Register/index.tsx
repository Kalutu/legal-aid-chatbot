import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { register } from "../../slices/authSlice";

const Register: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [phonenumber, setPhonenumber] = React.useState<string>("");
  const dispatch = useAppDispatch();
  const accounttype = "reporter";

  const handleRegister = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (email && password) {
      dispatch(
        register({
          firstname,
          lastname,
          phonenumber,
          email,
          password,
          accounttype,
        })
      );
    }
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center py-8 px-4 gap-6">
      <img
        className="w-20 h-20 rounded-full"
        src="./lawyer.jpeg"
        alt="lawyer"
      />
      <p className="text-white font-medium text-xl">Register to use Chatbot</p>

      <input
        value={firstname}
        className="focus:border-blue focus:border-2 focus:border-solid w-full max-w-md h-10 rounded-md p-3"
        placeholder="Enter your Firstname"
        type="text"
        onChange={(e) => setFirstname(e.target.value)}
      />

      <input
        value={lastname}
        className="focus:border-blue focus:border-2 focus:border-solid w-full max-w-md h-10 rounded-md p-3"
        placeholder="Enter your Lastname"
        type="text"
        onChange={(e) => setLastname(e.target.value)}
      />

      <input
        value={phonenumber}
        className="focus:border-blue focus:border-2 focus:border-solid w-full max-w-md h-10 rounded-md p-3"
        placeholder="Enter your Phonenumber"
        type="text"
        onChange={(e) => setPhonenumber(e.target.value)}
      />

      <input
        value={email}
        className="focus:border-blue focus:border-2 focus:border-solid w-full max-w-md h-10 rounded-md p-3"
        placeholder="Enter your Email Address"
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
        onClick={() => handleRegister()}
        className="bg-maroon rounded-md w-full max-w-md h-10 text-white"
      >
        REGISTER
      </button>

      <div className="flex flex-row items-center gap-2">
        <p className="text-white">Already have an account?</p>
        <Link to="/" className="text-lightblue font-medium">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
