import React, { useState, useEffect, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((selected) => selected !== option);
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  useEffect(() => {
    onSelect(selectedOptions);
  }, [selectedOptions, onSelect]);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block dropdown-container">
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center rounded-lg p-2 bg-gray-100 hover:bg-neutral-200 border border-gray-400 w-[70%]">
          <div className=" ">
            {selectedOptions.length > 0 ? (
              <span>{selectedOptions.join(", ")}</span>
            ) : (
              <span>Select Category</span>
            )}
          </div>
          <div>
            {isOpen ? (
              <BiChevronUp className="ml-2 text-gray-600" />
            ) : (
              <BiChevronDown className="ml-2 text-gray-600" />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className={`absolute mt-1 border rounded-md shadow-[0_0_8px_0] shadow-slate-300 w-[70%] z-10 bg-gray-100 ${
            options.length > 5 ? "max-h-[250px] overflow-y-auto" : ""
          }`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option.name)}
              className={`p-2 cursor-pointer  border-[0.5px] ${
                selectedOptions.includes(option.name)
                  ? " bg-blue-500 text-white hover:bg-blue-700"
                  : " hover:bg-blue-500 hover:text-white"
              }`}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
