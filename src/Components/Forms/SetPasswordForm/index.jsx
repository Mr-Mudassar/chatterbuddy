import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CustomBtn from "../../../Shared/CustomBtn";
import InputField from "../../../Shared/InputField";
import { useLocation, useNavigate } from "react-router-dom";
import { SET_PASSWORD_API_URL } from "../../../lib/constant";
import { setNewPassword } from "../../../Redux/features/Auth/authApi";
import { NEW_PASSWORD_INITIAL_VALUES } from "../../../Validations/InitialValues";
import { NEW_PASSWORD_VALIDATION_SCHEMA } from "../../../Validations/Validations";

const SetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    !location?.state?.email && navigate("/");
  }, []);

  const handleSubmit = (values) => {
    const data = {
      apiEndpoint: SET_PASSWORD_API_URL,
      requestData: JSON.stringify(values),
    };

    dispatch(setNewPassword(data)).then((res) => {
      if (res.type === "setNewPassword/fulfilled") {
        navigate("/");
      }
    });
  };

  return (
    <div className="flex align-center justify-center px-4 py-8 h-full m-3">
      <div className="my-auto md:w-96 w-full">
        <div className="my-8">
          <h3 className="m-auto text-2xl text-blacks font-bold text-center w-max px-2 border-b border-gray-300 py-2 rounded-lg shadow-lg shadow-[#0051de49]">
            Babylon WorkShop
          </h3>
        </div>
        <h3 className="w-full text-h3 font-bold mb-4">Set New Password</h3>
        <div className="w-full">
          <Formik
            initialValues={{
              ...NEW_PASSWORD_INITIAL_VALUES,
              email: location?.state?.email,
            }}
            validationSchema={NEW_PASSWORD_VALIDATION_SCHEMA}
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
                    type="password"
                    required={true}
                    name="newPassword"
                    label={"New Password"}
                    value={values.newPassword}
                    onBlurHandle={handleBlur}
                    placeholder="Enter new password"
                    onChangeHandle={handleChange}
                    className="w-full mb-0 p-2 border rounded"
                    error={
                      errors.newPassword && touched.newPassword
                        ? errors.newPassword
                        : ""
                    }
                  />
                </div>

                <div className="mt-6">
                  <CustomBtn
                    text="Save"
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

export default SetPasswordForm;
