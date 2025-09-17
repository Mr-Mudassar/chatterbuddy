import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomBtn from "../../../Shared/CustomBtn";
import { HiOutlineEnvelope } from "react-icons/hi2";
import InputField from "../../../Shared/InputField";
import { FORGET_PASSWORD_API_URL } from "../../../lib/constant";
import { forgotPassword } from "../../../Redux/features/Auth/authApi";
import { FORGOT_PASSWORD_SCHEMA } from "../../../Validations/Validations";
import { FORGOT_PASSWORD_INITIAL_VALUES } from "../../../Validations/InitialValues";

const ForgotPasswordForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    const data = {
      apiEndpoint: FORGET_PASSWORD_API_URL,
      requestData: JSON.stringify(values),
    };

    dispatch(forgotPassword(data)).then((res) => {
      if (res.type === "forgotPassword/fulfilled") {
        console.log(res?.payload?.data);
        navigate("/verifyOtp", { state: { email: values?.email } });
      }
    });
  };

  return (
    <div className=" flex align-center justify-center px-4 py-8 h-full m-3">
      {/* {isLoading && <LoadingScreen />} */}
      <div className=" my-auto md:w-96 w-full">
        <div className="my-8">
          {/* <img width={150} src={Images.LOGO_IMG} alt="" /> */}
          <h3 className="m-auto text-2xl text-blacks font-bold text-center w-max px-2 border-b border-gray-300 py-2 rounded-lg shadow-lg shadow-[#0051de49]">
            Babylon WorkShop
          </h3>
        </div>
        <h3 className="w-full text-h3 font-bold  mb-4">Forgot Password</h3>
        <div className="w-full">
          <Formik
            validationSchema={FORGOT_PASSWORD_SCHEMA}
            initialValues={FORGOT_PASSWORD_INITIAL_VALUES}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="">
                <div className="mb-3">
                  <InputField
                    type="email"
                    name="email"
                    label={"Email"}
                    required={true}
                    value={values.email}
                    placeholder="Enter email"
                    onBlurHandle={handleBlur}
                    onChangeHandle={handleChange}
                    className="w-full mb-0 p-2 border rounded"
                    icon={<HiOutlineEnvelope className="text-gray-600" />}
                    error={errors.email && touched.email ? errors.email : ""}
                  />
                </div>

                <div className="mt-6">
                  <CustomBtn
                    text="Get Code"
                    type={"submit"}
                    className="w-full mb-2 py-3 text-white"
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
