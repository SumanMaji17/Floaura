import React from "react";
import { useSelector } from "react-redux";
import AllAddress from "./AllAddress";
import AddAddress from "./AddAddress";


export default function Address() {
  const addresses = useSelector((state) => state.address.addresses);

  return (
    <div>
      {addresses.length>0 ? (
        <AllAddress />
      ):(
        <AddAddress/>
      )
    }
    </div>
  );
}
