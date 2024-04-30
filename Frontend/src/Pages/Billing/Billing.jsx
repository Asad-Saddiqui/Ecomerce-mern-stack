import React, { useState } from "react";
import Top from "../../Components/Top/Top";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Button = ({ children, className, onClick }) => (
  <button
    className={`border border-black px-4 py-2 rounded ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Billing = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formValues.firstName) {
      errors.firstName = "First Name is required.";
    }
    if (!formValues.streetAddress) {
      errors.streetAddress= "Street Address is required.";
    }
    if (!formValues.townCity) {
      errors.townCity=  "City is required.";
    }
    if (!formValues.phoneNumber) {
      errors.phoneNumber = "Phone Number is required.";
    }
    if (!formValues.emailAddress) {
        errors.emailAddress = "Email Address is required.";
    }

    return errors;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert("Form submitted successfully.");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const detail = [
    { name: "Leather Shoes", price: "10" },
    { name: "Leather Watch", price: "100" },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Top />
      <Navbar />
      <div className="px-4 sm:px-6 md:px-8 lg:px-24 flex flex-col gap-10 my-10">
        <h1 className="text-lg md:text-xl font-semibold">
          Account / My Account / Product / View Cart / <b>CheckOut</b>
        </h1>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">Billing Details</h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label>
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  className="bg-gray-100 w-full md:w-[20vw] px-4 py-2 rounded focus:outline-none"
                />
                {formErrors.firstName && (
                  <span className="text-red-600">{formErrors.firstName}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formValues.companyName}
                  onChange={handleInputChange}
                  className="bg-gray-100 w-full md:w-[20vw] px-4 py-2 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label>
                  Street Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formValues.streetAddress}
                  onChange={handleInputChange}
                  className="bg-gray-100 w-full md:w-[20vw] px-4 py-2 rounded focus:outline-none"
                />
                {formErrors.streetAddress && (
                  <span className="text-red-600">{formErrors.streetAddress}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label>
                  Town/City <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="townCity"
                  value={formValues.townCity}
                  onChange={handleInputChange}
                  className="bg-gray-100 w-full md:w-[20vw] px-4 py-2 rounded focus:outline-none"
                />
                {formErrors.townCity && (
                  <span className="text-red-600">{formErrors.townCity}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label>
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleInputChange}
                  className="bg-gray-100 w-full md:w-[20vw] px-4 py-2 rounded focus:outline-none"
                />
                {formErrors.phoneNumber && (
                  <span className="text-red-600">{formErrors.phoneNumber}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label>
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="emailAddress"
                  value={formValues.emailAddress}
                  onChange={handleInputChange}
                  className="bg-gray-100 w-full md:w-[20vw] px-4 py-2 rounded focus:outline-none"
                />
                {formErrors.emailAddress && (
                  <span className="text-red-600">{formErrors.emailAddress}</span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" />
                <p className="text-sm">Save this information for faster checkout next time.</p>
              </div>
            </div>

          </div>

          <div className="flex-1 shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex flex-col gap-6">
              {detail.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5 mt-4">
              <div className="flex justify-between border-b-black border-b-[1px] py-2">
                <h1>Total</h1>
                <h1>$110</h1>
              </div>
            </div>

            <div className="flex flex-col mt-6">
              <h2 className="text-xl">Choose Payment Method</h2>

              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="choices"
                    value="Bank"
                    checked={selectedOption === "Bank"}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  Bank
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="choices"
                    value="Cash on Delivery"
                    checked={selectedOption === "Cash on Delivery"}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  Cash on Delivery
                </label>
              </div>

              <div className="mt-4">
                {selectedOption ? (
                  <p className="text-green-600">Selected: {selectedOption}</p>
                ) : (
                  <p className="text-red-600">No option selected</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 items-center mt-4">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="py-2 px-4 border-[1px] rounded border-black outline-none w-full sm:w-40"
                />
                <Button className="bg-red-500 text-white border-none w-full sm:w-40">
                  Apply Coupon
                </Button>
              </div>

              
            
              <Button
                className="bg-red-500 text-white w-full sm:w-40 mt-2"
                onClick={handleSubmit}
              >
                Place Order
              </Button>
           
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Billing;
