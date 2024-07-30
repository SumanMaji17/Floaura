import React, { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { contactUsAction } from "../../redux/actions/userAction";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    try {
      if(name.length===0 || email.length===0 || message.length===0){
        toast.error("All fields are required...")
      }else{
        dispatch(contactUsAction({name,email,message}));
        
        setEmail("");
        setMessage("");
        setName("");
      }
    } catch (error) {
      toast.error("Error while saving form. Please try again...");
    }
  };
  return (
    <div className=" mx-10 ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-slate-900 font-bold text-3xl">Get in Touch</h1>
        <p className="text-slate-400">
          We'd love to here for you, Please fill out this form.
        </p>
      </div>

      <div className=" flex justify-around mt-10">
        <div className=" flex flex-col justify-center p-10 gap-5">
          <div className=" flex items-center gap-3">
            <HiOutlineHome className=" bg-cyan-800 text-white p-3 text-5xl rounded-full" />
            <div className=" flex flex-col">
              <span className=" text-cyan-800 text-lg font-bold">Address</span>
              <span>Kolkata</span>
            </div>
          </div>
          <div className=" flex items-center gap-3">
            <FiPhone className=" bg-cyan-800 text-white p-3 text-5xl rounded-full" />
            <div className=" flex flex-col">
              <span className=" text-cyan-800 text-lg font-bold">Phone</span>
              <span>982888211</span>
            </div>
          </div>
          <div className=" flex items-center gap-3">
            <MdOutlineEmail className=" bg-cyan-800 text-white p-3 text-5xl rounded-full" />
            <div className=" flex flex-col">
              <span className=" text-cyan-800 text-lg font-bold">Email</span>
              <span>sumannmaji@gmail.com</span>
            </div>
          </div>
        </div>
        <div className=" bg-slate-100 flex flex-col gap-3 p-10 w-[40%] rounded-md border-2 ">
          <h1 className=" text-xl font-bold">Send Message</h1>
          <div className=" flex flex-col gap-2">
            <span className=" font-medium">Full Name</span>
            <input
              type="text"
              value={name}
              placeholder=" Enter full name"
              className="px-2 py-1 rounded"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" flex flex-col gap-2">
            <span className=" font-medium">Email</span>
            <input
              type="text"
              value={email}
              placeholder=" Enter Email"
              className="px-2 py-1 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" flex flex-col gap-2">
            <span className=" font-medium">Message</span>
            <textarea
              rows={2}
              value={message}
              placeholder="Enter your message"
              className=" px-2 py-1 rounded"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div
            className=" text-center rounded-md bg-cyan-800 hover:bg-cyan-900 text-white py-2 cursor-pointer"
            onClick={handleSave}
          >
            Send
          </div>
        </div>
      </div>
    </div>
  );
}
