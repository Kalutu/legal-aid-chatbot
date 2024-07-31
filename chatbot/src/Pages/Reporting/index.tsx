import React, { useState, ChangeEvent } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import { reportCase } from "../../slices/statsSlice";
const Reporting = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    gender: "",
    incident: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    const action = await dispatch(reportCase(formData));
    if (reportCase.fulfilled.match(action)) {
      setFormData({
        firstname: "",
        lastname: "",
        phonenumber: "",
        gender: "",
        incident: "",
      });
    }
  };
  const action = () => {
    navigate(-1);
  };

  return (
    <div>
      <div
        onClick={() => {
          action();
        }}
        className="my-1"
      >
        <IoIosArrowBack className="w-8 h-8 text-white bg-maroon rounded-full p-2" />
      </div>

      <div className="bg-primary min-h-screen flex flex-col justify-start items-center py-8 px-4 gap-6">
        <input
          className="focus:border-blue focus:border-2 focus:border-solid w-full max-w-md h-10 rounded-md p-3 mt-0"
          placeholder="FirstName"
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          className="focus:border-blue focus:border-2 focus:border-solid w-full max-w-md h-10 rounded-md p-3"
          placeholder="LastName"
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <input
          className="focus:border-blue focus:border-2 focus:border-solid w-full max-w-md h-10 rounded-md p-3"
          placeholder="PhoneNumber"
          type="number"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
        />
        <select
          className="focus:border-blue focus:border-2 focus:border-solid w-full max-w-md h-10 rounded-md px-2"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="incident" className="text-white w-full max-w-md mb-3">
          Give an in-depth description of the incident including your location
          for assistance.
        </label>
        <textarea
          rows={4}
          className="focus:border-blue focus:border-2 focus:border-solid rounded-md p-3 w-full max-w-md"
          placeholder="Incident"
          id="incident"
          name="incident"
          value={formData.incident}
          onChange={handleChange}
        ></textarea>

        <button
          className="bg-maroon rounded-md w-full max-w-md h-10 text-white"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Reporting;
