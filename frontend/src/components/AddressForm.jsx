import React from "react";

function AddressForm({
  prefix = "",
  formData,
  errors,
  handleChange,
  showCity = true,
  phoneRequired = true,
}) {
  const getName = (field) =>
    prefix
      ? `${prefix}${field.charAt(0).toUpperCase() + field.slice(1)}`
      : field;

  const getValue = (field) => formData[getName(field)] || "";

  const hasError = (field) => errors[getName(field)];

  return (
    <div>
      {/* City */}
      {showCity && (
        <div className="mb-2">
          <select
            name={getName("city")}
            value={getValue("city")}
            onChange={handleChange}
            className={`w-full border ${
              hasError("city") ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 text-xs bg-white`}
          >
            <option value="">Select City</option>
            <option>Lahore</option>
            <option>Karachi</option>
            <option>Islamabad</option>
            <option>Multan</option>
          </select>
          {hasError("city") && (
            <p className="text-red-500 text-[11px] mt-1">
              Please select your city
            </p>
          )}
        </div>
      )}

      {/* Country */}
      <div className="mb-2">
        <select
          name={getName("country")}
          value={getValue("country")}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-1 text-xs bg-white"
        >
          <option value="Pakistan">Pakistan</option>
        </select>
      </div>

      {/* First + Last Name */}
      <div className="grid grid-cols-2 md:gap-3 gap-1.5 mb-2">
        <div>
          <input
            type="text"
            name={getName("firstName")}
            placeholder="First name"
            value={getValue("firstName")}
            onChange={handleChange}
            className={`w-full border ${
              hasError("firstName") ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 text-xs bg-white`}
          />
          {hasError("firstName") && (
            <p className="text-red-500 text-[11px] mt-1">
              Please enter your first name
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name={getName("lastName")}
            placeholder="Last name"
            value={getValue("lastName")}
            onChange={handleChange}
            className={`w-full border ${
              hasError("lastName") ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 text-xs bg-white`}
          />
          {hasError("lastName") && (
            <p className="text-red-500 text-[11px] mt-1">
              Please enter your last name
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="mb-2">
        <input
          type="text"
          name={getName("address")}
          placeholder="Address"
          value={getValue("address")}
          onChange={handleChange}
          className={`w-full border ${
            hasError("address") ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 text-xs bg-white`}
        />
        {hasError("address") && (
          <p className="text-red-500 text-[11px] mt-1">
            Please enter your address
          </p>
        )}
      </div>

      {/* Apartment */}
      <div className="mb-2">
        <input
          type="text"
          name={getName("apartment")}
          placeholder="Apartment, suite, etc. (optional)"
          value={getValue("apartment")}
          onChange={handleChange}
          className={`w-full border ${
            hasError("apartment") ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 text-xs bg-white`}
        />
        {hasError("apartment") && (
          <p className="text-red-500 text-[11px] mt-1">
            Please enter apartment/suite info
          </p>
        )}
      </div>

      {/* Postal */}
      <div className="mb-2">
        <input
          type="text"
          name={getName("postal")}
          placeholder="Postal code (optional)"
          value={getValue("postal")}
          onChange={handleChange}
          className={`w-full border ${
            hasError("postal") ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 text-xs bg-white`}
        />
        {hasError("postal") && (
          <p className="text-red-500 text-[11px] mt-1">
            Please enter your postal code
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-2">
        <input
          type="text"
          name={getName("phone")}
          placeholder={phoneRequired ? "Phone" : "Phone (optional)"}
          value={getValue("phone")}
          onChange={handleChange}
          className={`w-full border ${
            hasError("phone") ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 text-xs bg-white`}
        />
        {hasError("phone") && (
          <p className="text-red-500 text-[11px] mt-1">
            Please enter your phone number
          </p>
        )}
      </div>
    </div>
  );
}

export default AddressForm;
