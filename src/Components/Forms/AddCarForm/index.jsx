import {
  UPDATE_CAR_API_URL,
  ADD_NEW_CAR_API_URL,
  PARTS_STATUS_OPTIONS,
  VEHICLE_STATUS_OPTIONS,
  UPLOAD_PDF_FILE_API_URL,
  GET_ALL_TECHNICIANS_API_URL,
  FIND_VEHICLE_DETAIL_BY_VIN_NUMBER_API_URL,
} from "../../../lib/constant";
import {
  addNewVehicleByAdmin,
  updateVehicleByAdmin,
  getAllTechniciansByAdmin,
  readPdfFileForAutoFilling,
  getVehicleDetailsByVinNumberByAdmin,
} from "../../../Redux/features/Admin/adminApi";
import Toaster from "../../Toaster";
import Dropdown from "../../Dropdown";
import CustomBtn from "../../CustomBtn";
import { FiSend } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import InputField from "../../InputField";
import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { RiSearchLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import { FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import CheckboxInputField from "../../CheckboxInputField";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import PhoneNumberInputField from "../../PhoneNumberInputField";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import { ADD_CAR_INITIAL_VALUES } from "../../../Validations/InitialValues";
import { ADD_CAR_VALIDATION_SCHEMA } from "../../../Validations/Validations";

const AddCarForm = (props) => {
  const { getAllVehiclesFunc, toggleAddCarModel, mode, preFillingData } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [enteredVinNumber, setEnteredVinNumber] = useState("");
  const [allTechniciansData, setAllTechniciansData] = useState([]);

  const getAllTechniciansFunc = () => {
    const data = {
      apiEndpoint: GET_ALL_TECHNICIANS_API_URL,
    };

    dispatch(getAllTechniciansByAdmin(data)).then((res) => {
      if (res.type === "getAllTechniciansByAdmin/fulfilled") {
        setAllTechniciansData(res?.payload?.data?.technicain?.rows);
      }
    });
  };

  useEffect(() => {
    getAllTechniciansFunc();
  }, []);

  const addNewVehicleFunc = (values) => {
    if (
      values?.status.toLowerCase() !== "not in shop" &&
      values?.deliveryDate === ""
    ) {
      return Toaster.error("Please enter the vehicle delivery date");
    }

    if (mode === "add") {
      const data = {
        apiEndpoint: ADD_NEW_CAR_API_URL,
        requestData: JSON.stringify(values),
      };
      dispatch(addNewVehicleByAdmin(data)).then((res) => {
        if (res.type === "addNewVehicleByAdmin/fulfilled") {
          getAllVehiclesFunc();
          toggleAddCarModel();
        }
      });
    } else if (mode === "edit") {
      const data = {
        apiEndpoint: UPDATE_CAR_API_URL,
        requestData: JSON.stringify(values),
      };

      dispatch(updateVehicleByAdmin(data)).then((res) => {
        if (res.type === "updateVehicleByAdmin/fulfilled") {
          getAllVehiclesFunc();
          toggleAddCarModel();
        }
      });
    }
  };

  const searchDetailsByVinNumber = (value, setValues) => {
    const data = {
      apiEndpoint:
        FIND_VEHICLE_DETAIL_BY_VIN_NUMBER_API_URL + `?vinNumber=${value}`,
    };

    dispatch(getVehicleDetailsByVinNumberByAdmin(data)).then((res) => {
      if (res.type === "getVehicleDetailsByVinNumberByAdmin/fulfilled") {
        setEnteredVinNumber(value);
        setValues("make", res?.payload?.data?.decodedVIN?.Make);
        setValues("model", res?.payload?.data?.decodedVIN?.Model);
        setValues("year", res?.payload?.data?.decodedVIN?.ModelYear);
      }
    });
  };

  const uploadFileForAutofillingDetialsFunc = (file, setFieldValue) => {
    if (file && file.type !== "application/pdf") {
      Toaster.error("Only PDF file can be uploaded!");
      setLoading(false);
      return;
    }
    setLoading(true);

    Toaster.success("Please Wait! This prcess may take a while.");

    const formData = new FormData();
    formData.append("avatar", file);

    const data = {
      apiEndpoint: UPLOAD_PDF_FILE_API_URL,
      requestData: formData,
    };

    dispatch(readPdfFileForAutoFilling(data))
      .then((res) => {
        if (res.type === "readPdfFileForAutoFilling/fulfilled") {
          console.log(res.payload);

          if (res?.payload?.data?.vin_number) {
            searchDetailsByVinNumber(
              res?.payload?.data?.vin_number,
              setFieldValue
            );
          }

          const partsData = res?.payload?.data?.parts_list;

          const filteredPartsData = partsData?.filter(
            (item) =>
              item?.price !== null &&
              item?.quantity !== null &&
              item?.part_number !== null
          );

          console.log("Filtered Parts Data", filteredPartsData);

          filteredPartsData.forEach((item, index) => {
            setFieldValue(`carPart.${index}`, {
              price: item?.price,
              quantity: item?.quantity,
              partNumber: item?.part_number,
              description: item?.description,
              deliveryDate: "",
              status: "",
              supplier: "",
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error processing file:", error);
        Toaster.error("Failed to process file. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log("loading values", loading);

  const carFormInitialValues =
    mode === "add"
      ? ADD_CAR_INITIAL_VALUES
      : { ...ADD_CAR_INITIAL_VALUES, ...(preFillingData || {}) };

  const calculateTotalPrice = (carParts) => {
    const total = carParts.reduce(
      (acc, item) => acc + (parseFloat(item.ourPrice) || 0),
      0
    );
    setTotalPrice(total);
  };

  return (
    <div>
      {loading && <LoadingScreen />}
      <Formik
        initialValues={carFormInitialValues}
        validationSchema={ADD_CAR_VALIDATION_SCHEMA}
        onSubmit={(values) => addNewVehicleFunc(values)}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
          setFieldValue,
        }) => {
          // Calculate total price dynamically
          const dynamicTotalPrice = calculateTotalPrice(values.carPart);
          return (
            <Form onSubmit={handleSubmit}>
              <hr className="text-gray-400 w-full mb-2" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
                <p className="font-semibold text-blue-600 col-span-1 md:col-span-2 lg:col-span-3 border-b border-blue-600 w-max">
                  Customer Details
                </p>
                <InputField
                  type="text"
                  required={false}
                  name="firstName"
                  label={"Customer First Name"}
                  placeholder="Enter first name"
                  value={values.firstName}
                  onBlurHandle={handleBlur}
                  onChangeHandle={handleChange}
                  className="w-full mb-0 p-2 border rounded-md"
                  error={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : ""
                  }
                />
                <InputField
                  type="text"
                  required={true}
                  name="lastName"
                  value={values.lastName}
                  onBlurHandle={handleBlur}
                  label={"Customer Last Name"}
                  placeholder="Enter last name"
                  onChangeHandle={handleChange}
                  className="w-full mb-0 p-2 border rounded-md"
                  error={
                    errors.lastName && touched.lastName ? errors.lastName : ""
                  }
                />

                <InputField
                  type="email"
                  name="email"
                  required={true}
                  value={values.email}
                  label={"Customer Email"}
                  placeholder="Enter email"
                  onBlurHandle={handleBlur}
                  onChangeHandle={handleChange}
                  className="w-full mb-0 p-2 border rounded-md"
                  error={errors.email && touched.email ? errors.email : ""}
                />

                <PhoneNumberInputField
                  name="poNumber"
                  label="Customer Phone No"
                  className={""}
                  required={true}
                  value={values.poNumber}
                  setFieldValue={setFieldValue}
                  error={
                    errors.poNumber && touched.poNumber ? errors.poNumber : ""
                  }
                />

                <InputField
                  type="text"
                  required={false}
                  name="vehiclePoNumber"
                  onBlurHandle={handleBlur}
                  label={"Vehicle PO Number"}
                  onChangeHandle={handleChange}
                  value={values?.vehiclePoNumber}
                  placeholder="Enter vehicle PO number"
                  className="w-full mb-0 p-2 border rounded-md"
                  error={
                    errors.vehiclePoNumber && touched.vehiclePoNumber
                      ? errors.vehiclePoNumber
                      : ""
                  }
                />

                <hr className="text-gray-400 w-full col-span-1 md:col-span-2 lg:col-span-3 mt-4" />
                <p className="font-semibold text-blue-600 col-span-1 md:col-span-2 lg:col-span-3 border-b border-blue-600 w-max">
                  Vehicle Details
                </p>

                <span>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) =>
                      uploadFileForAutofillingDetialsFunc(
                        e?.target?.files[0],
                        setFieldValue
                      )
                    }
                  />
                  <label
                    htmlFor="file-upload"
                    className="mt-6 w-full cursor-pointer inline-flex justify-center items-center gap-x-2 px-4 py-3 border border-blue-600 text-blue-600 rounded-sm bg-white hover:bg-blue-100"
                  >
                    <MdOutlineDriveFolderUpload size={20} />
                    <p className="font-semibold">Upload File To Autofill</p>
                  </label>
                </span>

                <InputField
                  type="text"
                  required={false}
                  value={enteredVinNumber}
                  label={"Search by VIN Number"}
                  placeholder="Enter vehicle VIN number"
                  className="w-full mb-0 p-2 border rounded-md"
                  onChangeHandle={(e) => setEnteredVinNumber(e.target.value)}
                  error={errors.year && touched.year ? errors.year : ""}
                />

                <CustomBtn
                  type="button"
                  text={
                    <span className="flex gap-x-2">
                      <RiSearchLine size={18} />
                      <p className="font-normal">Search</p>
                    </span>
                  }
                  handleOnClick={() => {
                    if (enteredVinNumber === "") {
                      Toaster.error("Please enter VIN number to search");
                    } else {
                      searchDetailsByVinNumber(enteredVinNumber, setFieldValue);
                    }
                  }}
                  className={
                    "font-semibold rounded-sm h-min w-full mt-6 flex justify-center items-center"
                  }
                />

                <InputField
                  type="text"
                  name="year"
                  required={true}
                  value={values.year}
                  label={"Vehicle Year"}
                  onBlurHandle={handleBlur}
                  onChangeHandle={handleChange}
                  placeholder="Enter vehicle year"
                  className="w-full mb-0 p-2 border rounded-md"
                  error={errors.year && touched.year ? errors.year : ""}
                />

                <InputField
                  type="text"
                  name="make"
                  required={true}
                  value={values.make}
                  label={"Vehicle Make"}
                  onBlurHandle={handleBlur}
                  onChangeHandle={handleChange}
                  placeholder="Enter vehicle make"
                  className="w-full mb-0 p-2 border rounded-md"
                  error={errors.make && touched.make ? errors.make : ""}
                />

                <InputField
                  type="text"
                  name="model"
                  required={true}
                  value={values.model}
                  label={"Vehicle Model"}
                  onBlurHandle={handleBlur}
                  onChangeHandle={handleChange}
                  placeholder="Enter vehicle model"
                  className="w-full mb-0 p-2 border rounded-md"
                  error={errors.model && touched.model ? errors.model : ""}
                />
                <hr className="text-gray-400 w-full col-span-1 md:col-span-2 lg:col-span-3 mt-4" />

                <p className="font-semibold text-blue-600 col-span-1 md:col-span-2 lg:col-span-3 border-b border-blue-600 w-max">
                  Ordered Parts
                </p>

                <FieldArray name="carPart">
                  {({ push, remove }) => (
                    <>
                      <CustomBtn
                        disabled={values.carPart.length > 0}
                        text={
                          <span className="flex gap-x-2 justify-center items-center text-blue-600">
                            <BsPencilSquare size={20} />
                            <p>Add Parts Manaully</p>
                          </span>
                        }
                        handleOnClick={() => {
                          if (true) {
                            push({
                              price: "",
                              notes: "",
                              status: "",
                              quantity: "",
                              ourPrice: "",
                              supplier: "",
                              partNumber: "",
                              description: "",
                              deliveryDate: "",
                            });
                          }
                        }}
                        className={
                          "font-semibold rounded-sm !bg-white text-blue-600 border border-blue-600 hover:!bg-blue-200"
                        }
                      />

                      {values.carPart.map((item, index) => (
                        <div
                          key={index}
                          className="col-span-1 md:col-span-2 lg:col-span-3 grid md:gird-cols-2 lg:grid-cols-3 border border-blue-300 shadow-md rounded-sm gap-4 p-4 py-6 relative my-2"
                        >
                          <RxCross2
                            size={28}
                            onClick={() => remove(index)}
                            className="hover:bg-stone-200 hover:text-red-600 rounded-md text-gray-600 p-1 absolute top-1 right-1 cursor-pointer"
                          />
                          <InputField
                            type="text"
                            required={false}
                            label={"Supplier"}
                            onBlurHandle={handleBlur}
                            onChangeHandle={handleChange}
                            placeholder="Enter supplier"
                            name={`carPart.${index}.supplier`}
                            value={values.carPart[index].supplier}
                            className="w-full mb-0 p-2 border rounded-md"
                            error={
                              errors?.carPart?.[index]?.supplier &&
                              touched.carPart?.[index]?.supplier
                                ? errors.carPart[index]?.supplier
                                : ""
                            }
                          />

                          <InputField
                            type="text"
                            required={true}
                            label={"Part Number"}
                            onBlurHandle={handleBlur}
                            onChangeHandle={handleChange}
                            placeholder="Enter part number"
                            name={`carPart.${index}.partNumber`}
                            value={values.carPart[index].partNumber}
                            className="w-full mb-0 p-2 border rounded-md"
                            error={
                              errors?.carPart?.[index]?.partNumber &&
                              touched.carPart?.[index]?.partNumber
                                ? errors.carPart[index]?.partNumber
                                : ""
                            }
                          />

                          <InputField
                            type="text"
                            required={true}
                            label={"Description"}
                            onBlurHandle={handleBlur}
                            onChangeHandle={handleChange}
                            placeholder="Enter description"
                            name={`carPart.${index}.description`}
                            value={values.carPart[index].description}
                            className="w-full mb-0 p-2 border rounded-md"
                            error={
                              errors?.carPart?.[index]?.description &&
                              touched.carPart?.[index]?.description
                                ? errors.carPart[index]?.description
                                : ""
                            }
                          />

                          <InputField
                            type="number"
                            required={true}
                            label={"Quantity"}
                            onBlurHandle={handleBlur}
                            placeholder="Enter quantity"
                            onChangeHandle={handleChange}
                            name={`carPart.${index}.quantity`}
                            value={values.carPart[index].quantity}
                            className="w-full mb-0 p-2 border rounded-md"
                            error={
                              errors?.carPart?.[index]?.quantity &&
                              touched.carPart?.[index]?.quantity
                                ? errors.carPart[index]?.quantity
                                : ""
                            }
                          />

                          <InputField
                            type="text"
                            label={"Price"}
                            required={false}
                            onBlurHandle={handleBlur}
                            placeholder="Enter price"
                            onChangeHandle={handleChange}
                            name={`carPart.${index}.price`}
                            value={values.carPart[index].price}
                            className="w-full mb-0 p-2 border rounded-md"
                            error={
                              errors?.carPart?.[index]?.price &&
                              touched.carPart?.[index]?.price
                                ? errors.carPart[index]?.price
                                : ""
                            }
                          />

                          <InputField
                            type="text"
                            required={false}
                            label={"Our Price"}
                            onBlurHandle={handleBlur}
                            placeholder="Enter our price"
                            onChangeHandle={handleChange}
                            name={`carPart.${index}.ourPrice`}
                            value={values.carPart[index].ourPrice}
                            className="w-full mb-0 p-2 border rounded-md"
                            error={
                              errors?.carPart?.[index]?.ourPrice &&
                              touched.carPart?.[index]?.ourPrice
                                ? errors.carPart[index]?.ourPrice
                                : ""
                            }
                          />

                          <InputField
                            required={true}
                            type="date"
                            label={"Delivery Date"}
                            onBlurHandle={handleBlur}
                            onChangeHandle={handleChange}
                            placeholder="Enter delivery date"
                            name={`carPart.${index}.deliveryDate`}
                            value={values.carPart[index].deliveryDate}
                            className="w-full mb-0 p-2 border rounded-md"
                            error={
                              errors?.carPart?.[index]?.deliveryDate &&
                              touched.carPart?.[index]?.deliveryDate
                                ? errors.carPart[index]?.deliveryDate
                                : ""
                            }
                          />

                          <Dropdown
                            required={true}
                            label="Select Status"
                            placeholder="Select status"
                            Options={PARTS_STATUS_OPTIONS}
                            name={`carPart.${index}.status`}
                            value={values?.carPart[index]?.status}
                            onChangeHandle={(e) =>
                              setFieldValue(
                                `carPart.${index}.status`,
                                e.target.value
                              )
                            }
                            error={
                              errors?.carPart?.[index]?.status &&
                              touched.carPart?.[index]?.status
                                ? errors.carPart?.[index]?.status
                                : ""
                            }
                          />

                          <InputField
                            type="text"
                            label={"Notes"}
                            required={false}
                            placeholder="Enter notes"
                            onBlurHandle={handleBlur}
                            onChangeHandle={handleChange}
                            name={`carPart.${index}.notes`}
                            value={values.carPart[index].notes}
                            className="w-full mb-0 p-2 border rounded-md"
                            error={
                              errors?.carPart?.[index]?.notes &&
                              touched.carPart?.[index]?.notes
                                ? errors.carPart[index]?.notes
                                : ""
                            }
                          />
                        </div>
                      ))}

                      {values.carPart.length > 0 && (
                        <CustomBtn
                          type="button"
                          text={
                            <span className="flex gap-x-2">
                              <IoMdAdd size={18} />
                              <p className="font-normal"> Add More Parts</p>
                            </span>
                          }
                          handleOnClick={() => {
                            if (true) {
                              push({
                                notes: "",
                                price: "",
                                status: "",
                                quantity: "",
                                ourPrice: "",
                                supplier: "",
                                partNumber: "",
                                description: "",
                                deliveryDate: "",
                              });
                            }
                          }}
                          className={"font-semibold rounded-sm w-max"}
                        />
                      )}
                    </>
                  )}
                </FieldArray>

                <hr className="text-gray-400 w-full col-span-1 md:col-span-2 lg:col-span-3 mt-4" />
                <p className="font-semibold text-blue-600 col-span-1 md:col-span-2 lg:col-span-3 border-b border-blue-600 w-max">
                  Vehicle Status Information
                </p>

                <InputField
                  type="date"
                  required={values?.status.toLowerCase() !== "not in shop" }
                  name="deliveryDate"
                  label={"Delivery Date"}
                  onBlurHandle={handleBlur}
                  value={values?.deliveryDate}
                  onChangeHandle={handleChange}
                  placeholder="Enter delivery date"
                  className="w-full mb-0 p-2 border rounded-md"
                  error={
                    errors?.deliveryDate && touched?.deliveryDate
                      ? errors?.deliveryDate
                      : ""
                  }
                />

                <Dropdown
                  name="status"
                  required={true}
                  label="Select Status"
                  value={values?.status}
                  placeholder="Select status"
                  Options={VEHICLE_STATUS_OPTIONS}
                  error={errors?.status && touched.status ? errors.status : ""}
                  onChangeHandle={(e) =>
                    setFieldValue("status", e.target.value)
                  }
                />

                <InputField
                  value={totalPrice}
                  type="text"
                  disabled={true}
                  required={false}
                  name="totalPrice"
                  label={"Total Price"}
                  placeholder="No Price Given"
                  className="w-full mb-0 p-2 border rounded-md"
                />

                <hr className="text-gray-400 w-full mb-2 col-span-1 md:col-span-2 lg:col-span-3 mt-4" />

                <p className="font-semibold text-blue-600 col-span-1 md:col-span-2 lg:col-span-3 border-b border-blue-600 w-max">
                  Assign Technicians
                </p>

                <FieldArray name="TechnicianIds">
                  {({ push, remove }) => (
                    <>
                      {values.TechnicianIds.map((item, index) => (
                        <div
                          key={index}
                          className="col-span-1 md:col-span-2 lg:col-span-3 grid md:gird-cols-2 lg:grid-cols-3 border border-blue-300 shadow-md rounded-sm gap-4 p-4 py-6 relative my-2"
                        >
                          <RxCross2
                            size={28}
                            onClick={() => remove(index)}
                            className="hover:bg-stone-200 hover:text-red-600 rounded-md text-gray-600 p-1 absolute top-1 right-1 cursor-pointer"
                          />
                          {/* {setOrderIndex(index)} */}

                          <Dropdown
                            Options={allTechniciansData.map((item) => {
                              return {
                                label: item.firstName + " " + item.lastName,
                                value: item.id,
                              };
                            })}
                            required={true}
                            label="Select Technician"
                            placeholder="Select technician"
                            name={`TechnicianIds.${index}.TechnicianId`}
                            value={values?.TechnicianIds[index]?.TechnicianId}
                            onChangeHandle={(e) =>
                              setFieldValue(
                                `TechnicianIds.${index}.TechnicianId`,
                                e.target.value
                              )
                            }
                            error={
                              errors?.TechnicianIds?.[index]?.TechnicianId &&
                              touched.TechnicianIds?.[index]?.TechnicianId
                                ? errors.TechnicianIds?.[index]?.TechnicianId
                                : ""
                            }
                          />

                          <CheckboxInputField
                            required={false}
                            onBlur={handleBlur}
                            mainClass={
                              "mt-6 border border-gray-300 py-3 px-4 text-gray-900"
                            }
                            onChange={handleChange}
                            label="Notify Technician"
                            name={`TechnicianIds.${index}.isNotify`}
                            checked={values?.TechnicianIds[index]?.isNotify}
                            error={
                              errors?.TechnicianIds?.[index]?.isNotify &&
                              touched?.TechnicianIds?.[index]?.isNotify
                                ? errors?.TechnicianIds?.[index]?.isNotify
                                : ""
                            }
                          />
                        </div>
                      ))}

                      {/* {values.TechnicianIds.length > 0 && ( */}
                      <CustomBtn
                        type="button"
                        text={
                          <span className="flex gap-x-2">
                            <IoMdAdd size={18} />
                            <p className="font-normal">
                              Assign More Technicians
                            </p>
                          </span>
                        }
                        handleOnClick={() => {
                          if (true) {
                            push({
                              TechnicianId: "",
                              isNotify: false,
                            });
                          }
                        }}
                        className={"font-semibold rounded-sm w-max"}
                      />
                      {/* )} */}

                      <hr className="text-gray-400 w-full mb-2 col-span-1 md:col-span-2 lg:col-span-3 my-4" />
                    </>
                  )}
                </FieldArray>

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
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddCarForm;
