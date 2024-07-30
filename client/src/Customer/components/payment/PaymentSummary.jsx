import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CREATE_ORDER } from "../../../utils/ApiRoutes";
import { clearCartAction } from "../../../redux/actions/cartAction";
import { toast } from "react-toastify";
import { TiArrowBack } from "react-icons/ti";
import { verifyMember } from "../../../redux/actions/orderAction";

export default function PaymentSummary() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const orderAddressId = location.state.addressId;
  const totalPrice = cart.totalPrice;
  const items = cart.items;
  const [purchaseOption, setPurchaseOption] = useState("self");
  const [members, setMembers] = useState([]);
  const [memberErrors, setMemberErrors] = useState({});

  const handlePurchaseOptionChange = (event) => {
    setPurchaseOption(event.target.value);
  };


  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { countryCode: "+91", phoneNumber: "" }]); // Adding an empty member to the list
    } else {
      toast.error("Maximum of 4 members can be added.");
    }
  };

  const removeMember = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
    setMemberErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  const handleMemberChange = async (index, event) => {
    const updatedMembers = [...members];
    const phoneNumber = event.target.value;
    updatedMembers[index].phoneNumber = phoneNumber;
    setMembers(updatedMembers);

    const fullPhoneNumber = updatedMembers[index].countryCode + phoneNumber;

    if (phoneNumber) {
      const exists = await verifyMember(fullPhoneNumber);
      setMemberErrors((prev) => ({
        ...prev,
        [index]: exists ? "" : "Member does not exist",
      }));
    } else {
      setMemberErrors((prev) => ({
        ...prev,
        [index]: "",
      }));
    }
  };

  const handleCountryCodeChange = (index, event) => {
    const updatedMembers = [...members];
    updatedMembers[index].countryCode = event.target.value;
    setMembers(updatedMembers);
  };

  const makePayment = async () => {
    if (Object.values(memberErrors).some((error) => error)) {
      toast.error("Please resolve all member errors before proceeding.");
      return;
    }
    try {
      const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
      const updatedMembers =
        purchaseOption === "group"
          ? [
              ...members.map(
                (member) => member.countryCode + member.phoneNumber
              ),
              user.phone,
            ]
          : members.map((member) => member.countryCode + member.phoneNumber);
          console.log(updatedMembers)

      const response = await axios.post(
        CREATE_ORDER,
        {
          items,
          userId: user.id,
          totalPrice,
          orderType: purchaseOption,
          orderAddressId,
          members: updatedMembers,
        },
        {
          withCredentials: true,
        }
      );

      const result = stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.log(result.error);
        toast.error("Error while creating payment...");
      }
    } catch (error) {
      toast.error("Error while creating the payment. Please try again...");
      console.log("Error while creating the payment.");
    }
  };

  console.log(members)

  const countryCodes = [
    { code: "+91", name: "India" },
    { code: "+1", name: "United States" },
    // Add more country codes as needed
  ];

  return (
    <div
      className=" bg-slate-100 w-full px-10 py-5"
      style={{ boxShadow: "8px 10px 12px -7px rgba(0,0,0,0.12)" }}
    >
      <h1 className=" text-xl font-semibold pb-5">Order Summmary</h1>
      <div className=" grid grid-cols-2 gap-10">
        <div>
          {items.map((item) => (
            <div
              className=" flex gap-2 w-64 border-b-2 border-gray-400 py-4"
              key={item.id}
            >
              <div className=" w-20">
                <img src={item.image} />
              </div>
              <div className=" flex flex-col gap-2 w-[70%] ">
                <h1 className=" overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {item.productName}
                </h1>
                <span>Qty: {item.quantity}</span>
                <span>Rs {item.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className=" py-2 w-full">
          <div className=" flex flex-col bg-white px-3 py-2 rounded-xl gap-2">
            <div>
              <span className=" text-md font-bold underline">Grand Total:</span>
              <h1>Total Items: {cart.totalItems}</h1>
              <h1>Total Amount: Rs {cart.totalPrice}</h1>
            </div>
          </div>
          <div className="container px-3 py-2 rounded-xl mt-8 bg-white">
            <h1 className=" font-bold mb-4 underline">Purchase Mode</h1>
            <div className="mb-4">
              <label className="block text-md mb-2">
                <input
                  type="radio"
                  value="self"
                  checked={purchaseOption === "self"}
                  onChange={handlePurchaseOptionChange}
                  className="mr-2"
                />
                Self Buy
              </label>
              <label className="block text-md mb-2">
                <input
                  type="radio"
                  value="group"
                  checked={purchaseOption === "group"}
                  onChange={handlePurchaseOptionChange}
                  className="mr-2"
                />
                Group Buy
              </label>
            </div>

            {/* Display input fields based on the selected purchase option */}
            {purchaseOption === "group" && (
              <div>
                <h2 className="text-md font-semibold mb-2">
                  Member Details for Group Buy
                </h2>

                {members.map((member, index) => (
                  <div key={index} className="mb-2 flex flex-col gap-2">
                    <div>
                      <div className=" flex gap-2 w-full">
                        <select
                          value={member.countryCode}
                          onChange={(e) => handleCountryCodeChange(index, e)}
                          className="w-[55px] p-1 border rounded focus:outline-none focus:ring focus:border-cyan-500"
                        >
                          {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                              {`${country.code} (${country.name})`}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={member.phoneNumber}
                          onChange={(e) => handleMemberChange(index, e)}
                          placeholder={`Member ${index + 1} phone number.`}
                          className="border rounded px-1 mr-2 text-xs focus:outline-none focus:ring focus:border-cyan-500"
                        />
                      </div>
                      {memberErrors[index] && (
                        <span className="text-red-500 text-sm">
                          {memberErrors[index]}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeMember(index)}
                      className="bg-red-500 w-[50%] text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  className="bg-blue-500 w-[50%] text-white py-2 mt-2 rounded hover:bg-blue-600 text-sm"
                  onClick={addMember}
                >
                  Add Member
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" flex justify-between">
        <div
          className="flex items-center gap-1 bg-cyan-900 text-center text-white px-4 py-2 mt-4 rounded hover:bg-cyan-950 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <TiArrowBack className=" text-xl" />
          Go Back
        </div>
        <div
          className="bg-cyan-900 text-center text-white px-4 py-2 mt-4 rounded hover:bg-cyan-950 cursor-pointer"
          onClick={makePayment}
        >
          Proceed to Payment
        </div>
      </div>
    </div>
  );
}
