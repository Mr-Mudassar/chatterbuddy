import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { memo, useEffect, useState } from "react";
const PhoneInputField = (props) => {
  const {
    name,
    error,
    value,
    label,
    required,
    className,
    setFieldValue,
    disabled = false,
  } = props;

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
        className="font-semibold mb-1 text-sm flex gap-x-1 text-gray-900"
      >
        {label}
      </label>
      <PhoneInput
        inputProps={{
          name: name,
          disabled: disabled,
          required: required,
          className: `py-3 w-full !bg-white pl-12 rounded-full transition-all focus:outline-none ${className} text-gray-900 !border-1 !border-gray-200 hover:ring-[#00B48D] hover:ring-opacity-30 focus:border-[#00B48D] focus:ring-[#00B48D] focus:ring-2 focus:ring-opacity-30 focus-visible:outline-none focus-visible:border-[#00B48D] focus-visible:ring-opacity-30 !font-normal !text-sm ${
            disabled && "!text-gray-400"
          }`,
        }}
        value={tempValue}
        country={"us"}
        countryCodeEditable={true}
        masks={{ us: "... - ... - ...." }}
        onChange={handleInputChange}
        className={`mt-1 flex items-center w-full text-gray-900 custom-phone-input rounded-full !border-1 !border-gray-200 transition-all hover:ring-[#00B48D] hover:ring-opacity-30 focus:outline-none focus:border-[#00B48D] focus:ring-[#00B48D] focus:ring-2 focus:ring-opacity-30 focus-visible:outline-none focus-visible:border-[#00B48D] focus-visible:ring-opacity-30 !font-normal !text-sm`}
      ></PhoneInput>

      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
};

export default memo(PhoneInputField);
