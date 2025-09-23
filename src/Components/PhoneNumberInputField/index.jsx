import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { memo, useEffect, useState } from "react";
const PhoneInputField = (props) => {
  const { name, error, value, label, required, className, setFieldValue } =
    props;

  const [tempValue, setTempValue] = useState(value || "");

  useEffect(() => {
    setTempValue(value || "");
  }, [value]);

  const handleInputChange = (value) => {
    if (value === "1") {
      setTempValue("");
      setFieldValue(name, "");
    } else {
      setTempValue(value);
      setFieldValue(name, value);
    }
  };

  return (
    <div className="w-full m-0 ">
      <label
        htmlFor="input"
        className="font-semibold mb-1 flex gap-x-1 text-gray-900"
      >
        {label}
      </label>
      <PhoneInput
        inputProps={{
          name: name,
          required: required,
          className: `py-3 w-full !bg-white pl-12 rounded-full transition-all focus:outline-none ${className} text-gray-900 border-1 border-gray-400 hover:ring-[#00B48D] hover:ring-opacity-30 focus:border-[#00B48D] focus:ring-[#00B48D] focus:ring-2 focus:ring-opacity-30 focus-visible:outline-none focus-visible:border-[#00B48D] focus-visible:ring-opacity-30`,
        }}
        country={"us"}
        onlyCountries={["us"]}
        countryCodeEditable={false}
        masks={{ us: "... - ... - ...." }}
        value={tempValue}
        onChange={handleInputChange}
  className={`mt-1 flex items-center w-full text-gray-900 custom-phone-input rounded-full border border-gray-400 transition-all hover:ring-[#00B48D] hover:ring-opacity-30 focus:outline-none focus:border-[#00B48D] focus:ring-[#00B48D] focus:ring-2 focus:ring-opacity-30 focus-visible:outline-none focus-visible:border-[#00B48D] focus-visible:ring-opacity-30`}
      ></PhoneInput>

      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
};

export default memo(PhoneInputField);
