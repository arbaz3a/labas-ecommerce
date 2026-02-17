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
      {/* City (optional) */}
      {showCity && (
        <select
          name={getName("city")}
          value={getValue("city")}
          onChange={handleChange}
          className={`w-full border ${
            hasError("city") ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 mb-1 text-xs bg-white`}
        >
          <option value="">Select City</option>
          <option>Lahore</option>
          <option>Karachi</option>
          <option>Islamabad</option>
          <option>Multan</option>
        </select>
      )}

      {/* Country */}
      <select
        name={getName("country")}
        defaultValue="Pakistan"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-1 text-xs bg-white"
      >
        <option>Pakistan</option>
      </select>

      {/* First + Last Name */}
      <div className="grid grid-cols-2 md:gap-3 gap-1.5 mb-1">
        <input
          type="text"
          name={getName("firstName")}
          placeholder="First name"
          value={getValue("firstName")}
          onChange={handleChange}
          className={`border ${
            hasError("firstName") ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 text-xs bg-white`}
        />
        <input
          type="text"
          name={getName("lastName")}
          placeholder="Last name"
          value={getValue("lastName")}
          onChange={handleChange}
          className={`border ${
            hasError("lastName") ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 text-xs bg-white`}
        />
      </div>

      {/* Address */}
      <input
        type="text"
        name={getName("address")}
        placeholder="Address"
        value={getValue("address")}
        onChange={handleChange}
        className={`w-full border ${
          hasError("address") ? "border-red-500" : "border-gray-300"
        } rounded-md px-3 py-2 mb-1 text-xs bg-white`}
      />

      {/* Apartment */}
      <input
        type="text"
        name={getName("apartment")}
        placeholder="Apartment, suite, etc. (optional)"
        value={getValue("apartment")}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-1 text-xs bg-white"
      />

      {/* Postal */}
      <input
        type="text"
        name={getName("postal")}
        placeholder="Postal code (optional)"
        value={getValue("postal")}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-1 text-xs bg-white"
      />

      {/* Phone */}
      <input
        type="text"
        name={getName("phone")}
        placeholder={phoneRequired ? "Phone" : "Phone (optional)"}
        value={getValue("phone")}
        onChange={handleChange}
        className={`w-full border ${
          phoneRequired && hasError("phone")
            ? "border-red-500"
            : "border-gray-300"
        } rounded-md px-3 py-2 text-xs bg-white`}
      />
    </div>
  );
}

export default AddressForm;
