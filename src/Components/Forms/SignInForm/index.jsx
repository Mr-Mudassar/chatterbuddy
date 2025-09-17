import { Formik } from "formik";
import { Input } from "@/Components/ui/input";
import { useDispatch } from "react-redux";
// import { HiOutlineEnvelope } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { addNewTechnicianByAdmin } from "@/Redux/features/admin/adminApi";
import { SIGNIN_INITIAL_VALUES } from "@/Validations/InitialValues";
import { SIGNIN_VALIDATION_SCHEMA } from "@/Validations/Validations";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = (values) => {
    const data = {
      apiEndpoint: "LOGIN_API_URL",
      requestData: JSON.stringify(values),
    };

    dispatch(addNewTechnicianByAdmin(data)).then((res) => {
      if (res?.type === "addNewTechnicianByAdmin/fulfilled") {
        navigate("/admin/dashboard");
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
        <h3 className="w-full text-lg font-bold mb-4">Log In</h3>
        <div className="w-full">
          <Formik
            initialValues={SIGNIN_INITIAL_VALUES}
            validationSchema={SIGNIN_VALIDATION_SCHEMA}
            onSubmit={handleLoginSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="block font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={`pl-10 w-full mb-0 p-2 border rounded ${
                        errors.email && touched.email ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="block font-medium mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`w-full mb-0 p-2 border rounded ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mb-6">
                  <Link to="/forgotPassword">
                    <p className="text-right mb-0 text-[#0052DE] text-sm">
                      Forgot password
                    </p>
                  </Link>
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mb-2 py-3 text-white bg-[#0052DE] rounded hover:bg-[#003fa3] transition"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
