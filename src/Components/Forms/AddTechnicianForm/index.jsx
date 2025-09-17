import {
  addNewTechnicianByAdmin,
  updateTechnicianByAdmin,
} from "../../../Redux/features/Admin/adminApi";
import React from "react";
import {
  TECHNICIAN_STATUS,
  ADD_NEW_TECHNICIAN_API_URL,
  TECHNICIAN_SPECIALIZATIONS,
  UPDATE_TECHNICIANS_API_URL,
} from "../../../lib/constant";
import {
  ADD_TECHNICIAN_VALIDATION_SCHEMA,
  newPasswordValidationWithoutRequired,
} from "../../../Validations/Validations";
import { Formik } from "formik";
import Dropdown from "../../Dropdown";
import CustomBtn from "../../CustomBtn";
import { FiSend } from "react-icons/fi";
import { useDispatch } from "react-redux";
import InputField from "../../InputField";
import PhoneNumberInputField from "../../PhoneNumberInputField";
import { ADD_TECHNICIAN_INITIAL_VALUES } from "../../../Validations/InitialValues";

const AddTechnicianForm = (props) => {
  const dispatch = useDispatch();
  const { getAllTechniciansFunc, toggleAddCarModel, preFillingData, mode } =
    props;

  const IntialValuesOfForm =
    mode === "add"
      ? ADD_TECHNICIAN_INITIAL_VALUES
      : {
          ...ADD_TECHNICIAN_INITIAL_VALUES,
          ...(preFillingData || {}),
          password: "",
        };

  const validationSchemaOfForm =
    mode === "add"
      ? ADD_TECHNICIAN_VALIDATION_SCHEMA
      : ADD_TECHNICIAN_VALIDATION_SCHEMA.shape({
          password: newPasswordValidationWithoutRequired,
        });

  const addNewTechnicianFunc = (values) => {
    if (mode === "add") {
      const data = {
        apiEndpoint: ADD_NEW_TECHNICIAN_API_URL,
        requestData: JSON.stringify(values),
      };
      dispatch(addNewTechnicianByAdmin(data)).then((res) => {
        if (res.type === "addNewTechnicianByAdmin/fulfilled") {
          getAllTechniciansFunc();
          toggleAddCarModel();
        }
      });
    } else {
      const data = {
        apiEndpoint: UPDATE_TECHNICIANS_API_URL,
        requestData: JSON.stringify(values),
      };

      dispatch(updateTechnicianByAdmin(data)).then((res) => {
        if (res.type === "updateTechnicianByAdmin/fulfilled") {
          getAllTechniciansFunc();
          toggleAddCarModel();
        }
      });
    }
  };

  return (
    <div>
      <Formik
        initialValues={IntialValuesOfForm}
        validationSchema={validationSchemaOfForm}
        onSubmit={(values) => addNewTechnicianFunc(values)}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <hr className="text-gray-400 w-full mb-2" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
              <p className="font-semibold text-blue-600 col-span-1 md:col-span-2 lg:col-span-3 border-b border-blue-600 w-max">
                Technician Details
              </p>

              <InputField
                type="text"
                name="firstName"
                required={true}
                value={values?.firstName}
                onBlurHandle={handleBlur}
                onChangeHandle={handleChange}
                label={"Technician First Name"}
                placeholder="Enter technician first name"
                className="w-full mb-0 p-2 border rounded-md"
                error={
                  errors.firstName && touched.firstName ? errors.firstName : ""
                }
              />

              <InputField
                type="text"
                name="lastName"
                required={true}
                value={values?.lastName}
                onBlurHandle={handleBlur}
                onChangeHandle={handleChange}
                label={"Technician Last Name"}
                placeholder="Enter technician last name"
                className="w-full mb-0 p-2 border rounded-md"
                error={
                  errors.lastName && touched.lastName ? errors.lastName : ""
                }
              />

              <InputField
                type="email"
                name="email"
                required={true}
                value={values?.email}
                onBlurHandle={handleBlur}
                label={"Technician Email"}
                onChangeHandle={handleChange}
                placeholder="Enter technician email"
                className="w-full mb-0 p-2 border rounded-md"
                error={errors.email && touched.email ? errors.email : ""}
              />

              <PhoneNumberInputField
                className={""}
                required={true}
                name="phoneNumber"
                value={values?.phoneNumber}
                label="Technician Phone No"
                setFieldValue={setFieldValue}
                error={
                  errors.phoneNumber && touched.phoneNumber
                    ? errors.phoneNumber
                    : ""
                }
              />

              <InputField
                type="password"
                name="password"
                value={values?.password}
                onBlurHandle={handleBlur}
                placeholder="Enter password"
                label={"Technician Password"}
                onChangeHandle={handleChange}
                required={mode === "add" ? true : false}
                className="w-full mb-0 p-2 border rounded-md"
                error={
                  errors?.password && touched?.password ? errors?.password : ""
                }
              />

              <hr className="text-gray-400 w-full col-span-1 md:col-span-2 lg:col-span-3 mt-4" />

              <p className="font-semibold text-blue-600 col-span-1 md:col-span-2 lg:col-span-3 border-b border-blue-600 w-max">
                Additional Details
              </p>

              <InputField
                type="text"
                required={true}
                name="specialization"
                onBlurHandle={handleBlur}
                onChangeHandle={handleChange}
                value={values?.specialization}
                placeholder="Enter specialization"
                label={"Technician Specialization"}
                className="w-full mb-0 p-2 border rounded-md"
                error={
                  errors?.specialization && touched?.specialization
                    ? errors?.specialization
                    : ""
                }
              />

              <Dropdown
                required={true}
                name="availability"
                label="Availability"
                Options={TECHNICIAN_STATUS}
                value={values?.availability}
                placeholder="Select availability"
                onChangeHandle={(e) =>
                  setFieldValue("availability", e.target.value)
                }
                error={
                  errors.availability && touched.availability
                    ? errors.availability
                    : ""
                }
              />

              <hr className="text-gray-400 w-full col-span-1 md:col-span-2 lg:col-span-3 mt-4 mb-4" />

              <CustomBtn
                type="submit"
                text={
                  <span className="flex gap-x-2 justify-center items-center">
                    <FiSend size={16} />
                    <p className="font-sembold">SUBMIT</p>
                  </span>
                }
                className={
                  "font-semibold rounded-sm col-start-1 md:col-start-2 lg:col-start-3"
                }
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddTechnicianForm;
