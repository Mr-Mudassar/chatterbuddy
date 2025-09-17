import React from "react";
import {
  UPDATE_CAR_API_URL,
  VEHICLE_STATUS_OPTIONS,
} from "../../../lib/constant";
import { Formik } from "formik";
import Dropdown from "../../Dropdown";
import CustomBtn from "../../CustomBtn";
import { FiSend } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { UPDATE_VEHICLE_VALIDATION_SCHEMA } from "../../../Validations/Validations";
import { UPDATE_TECHNICIAN_INITIAL_VALUES } from "../../../Validations/InitialValues";
import { updateVehicleStatusByTechnician } from "../../../Redux/features/Technician/technicianApi";

const UpdateVehicleStatusForm = (props) => {
  const {
    selectedVehicle,
    getAllDeliverdVehiclesFunc,
    toggleStatusChangeModel,
  } = props;
  const dispatch = useDispatch();

  const updateVehicleStatusFunc = (values) => {
    const data = {
      apiEndpoint: UPDATE_CAR_API_URL,
      requestData: JSON.stringify({ ...values }),
    };

    dispatch(updateVehicleStatusByTechnician(data)).then((res) => {
      if (res.type === "updateVehicleStatusByTechnician/fulfilled") {
        getAllDeliverdVehiclesFunc();
        toggleStatusChangeModel();
      }
    });
  };

  return (
    <div>
      <Formik
        initialValues={{
          ...UPDATE_TECHNICIAN_INITIAL_VALUES,
          ...selectedVehicle,
        }}
        validationSchema={UPDATE_VEHICLE_VALIDATION_SCHEMA}
        onSubmit={(values) => updateVehicleStatusFunc(values)}
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
          <form onSubmit={handleSubmit} className="">
            <hr className="text-gray-400 w-full mb-4" />

            <div className="space-y-6">
              <p className="font-semibold text-blue-600  border-b border-blue-600 w-max">
                Technician Details
              </p>

              <Dropdown
                name="status"
                required={true}
                label="Vehicle Status"
                value={values?.status}
                placeholder="Select status"
                Options={VEHICLE_STATUS_OPTIONS}
                error={errors.status && touched.status ? errors.status : ""}
                onChangeHandle={(e) => setFieldValue("status", e.target.value)}
              />

              <hr className="text-gray-400 w-full" />

              <div className="flex justify-end">
                <CustomBtn
                  type="submit"
                  text={
                    <span className="flex gap-x-2 justify-center items-center">
                      <FiSend size={16} />
                      <p className="font-sembold">Update</p>
                    </span>
                  }
                  className={"font-semibold rounded-sm"}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateVehicleStatusForm;
