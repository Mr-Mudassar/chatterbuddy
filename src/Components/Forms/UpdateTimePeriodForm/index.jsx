import {
  BEFORE_DAYS_OPTIONS,
  GET_REMINDER_DAYS_API_URL,
  UPDATE_REMINDER_DAYS_API_URL,
} from "../../../lib/constant";
import {
  getTimePeriodByAdmin,
  updateTimePeriodByAdmin,
} from "../../../Redux/features/Admin/adminApi";
import { Formik } from "formik";
import Dropdown from "../../Dropdown";
import CustomBtn from "../../CustomBtn";
import { useDispatch } from "react-redux";
import { RxUpdate } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { UPDATE_TIME_PERIOD_INITIAL_VALUES } from "../../../Validations/InitialValues";
import { UPDATE_TECHNICIAN_VALIDATION_SCHEMA } from "../../../Validations/Validations";

const UpateTimePeriodForm = () => {
  const dispatch = useDispatch();
  const [remiderDaysData, setReminderDaysData] = useState([]);

  const getTimePeriodFunc = () => {
    const data = {
      apiEndpoint: GET_REMINDER_DAYS_API_URL,
    };
    dispatch(getTimePeriodByAdmin(data)).then((res) => {
      if (res.type === "getTimePeriodByAdmin/fulfilled") {
        setReminderDaysData(res?.payload?.data?.reminderNumber[0]);
      }
    });
  };

  useEffect(() => {
    getTimePeriodFunc();
  }, []);

  const updateTimePeriodFunc = (values) => {
    const data = {
      apiEndpoint: UPDATE_REMINDER_DAYS_API_URL,
      requestData: JSON.stringify(values),
    };
    dispatch(updateTimePeriodByAdmin(data)).then((res) => {
      if (res.type === "updateTimePeriodByAdmin/fulfilled") {
        getTimePeriodFunc();
      }
    });
  };

  return (
    <div className="p-6">
      {remiderDaysData.length !== 0 && (
        <Formik
          initialValues={{
            ...UPDATE_TIME_PERIOD_INITIAL_VALUES,
            id: remiderDaysData?.id,
            partsDeliveryAlertDays: remiderDaysData?.partsDeliveryAlertDays,
            vehicleDeliveryAlertDays: remiderDaysData?.vehicleDeliveryAlertDays,
            vehicleFollowUpNotificationDays:
              remiderDaysData?.vehicleFollowUpNotificationDays,
          }}
          validationSchema={UPDATE_TECHNICIAN_VALIDATION_SCHEMA}
          onSubmit={(values) => updateTimePeriodFunc(values)}
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
              <hr className="text-gray-400 w-full mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2  gap-x-4 gap-y-2">
                <p className="font-semibold text-blue-600 col-span-1 md:col-span-2 border-b border-blue-600 w-max mb-4">
                  Update Time Periods
                </p>

                <Dropdown
                  required={true}
                  Options={BEFORE_DAYS_OPTIONS()}
                  name="vehicleDeliveryAlertDays"
                  value={values?.vehicleDeliveryAlertDays}
                  label="Vehicle Delivery Alert Notification Period"
                  placeholder="Select vehicle delivery alert notification period"
                  onChangeHandle={(e) =>
                    setFieldValue("vehicleDeliveryAlertDays", e.target.value)
                  }
                  error={
                    errors.vehicleDeliveryAlertDays &&
                    touched.vehicleDeliveryAlertDays
                      ? errors.vehicleDeliveryAlertDays
                      : ""
                  }
                />

                <Dropdown
                  required={true}
                  Options={BEFORE_DAYS_OPTIONS()}
                  name="vehicleFollowUpNotificationDays"
                  label="Technician Follow Up Notification Period"
                  value={values?.vehicleFollowUpNotificationDays}
                  placeholder="Select customer follow up notification period"
                  onChangeHandle={(e) =>
                    setFieldValue(
                      "vehicleFollowUpNotificationDays",
                      e.target.value
                    )
                  }
                  error={
                    errors.vehicleFollowUpNotificationDays &&
                    touched.vehicleFollowUpNotificationDays
                      ? errors.vehicleFollowUpNotificationDays
                      : ""
                  }
                />

                <Dropdown
                  required={true}
                  mainClass="md:mt-6"
                  name="partsDeliveryAlertDays"
                  Options={BEFORE_DAYS_OPTIONS()}
                  value={values?.partsDeliveryAlertDays}
                  label="Parts Delivery Alert Notification Period"
                  placeholder="Select parts delivery alert notification period"
                  onChangeHandle={(e) =>
                    setFieldValue("partsDeliveryAlertDays", e.target.value)
                  }
                  error={
                    errors.partsDeliveryAlertDays &&
                    touched.partsDeliveryAlertDays
                      ? errors.partsDeliveryAlertDays
                      : ""
                  }
                />

                <hr className="text-gray-400 w-full col-span-1 md:col-span-2  mt-8 mb-8" />

                <div className="col-span-1 md:col-span-2 flex justify-end">
                  <CustomBtn
                    type="submit"
                    text={
                      <span className="flex gap-x-2 justify-center items-center">
                        <RxUpdate size={20} />
                        <p className="font-sembold">Update Time Period</p>
                      </span>
                    }
                    className="font-semibold rounded-sm w-max"
                  />
                </div>
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpateTimePeriodForm;
