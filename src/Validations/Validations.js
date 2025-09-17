import * as Yup from "yup";

const nameValidation = Yup.string()
  .min(2, "Name too short")
  .max(40, "Name too long")
  .required("Name required");

const emailValidation = Yup.string()
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email")
  .required("Email required");

const newPasswordValidation = Yup.string()
  .min(
    8,
    "Password must be at least 8 characters containing uppercase, lowercase, number, and symbol."
  )
  .max(40, "Password must be at most 40  characters long.")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,40}$/,
    "Password must be at least 8 characters containing uppercase, lowercase, number, and symbol."
  )
  .required("Password required");

const phoneValidation = Yup.string()
  .matches(/^[0-9]{1,15}$/, "Phone number is not valid")
  .required("Phone number is required");

const vehicleNumber = Yup.string()
  .required("Vehicle Number is required")
  .max(8)
  .min(4);

const vehicleModel = Yup.string()
  .required("Vehicle Model is required")
  .max(40)
  .min(2);

const vehicleYear = Yup.string().required("Vehicle Year is required");

const generalNumberValidation = Yup.string()
  .required("This field is required")
  .min(1)
  .max(28);

const generalTextValidation = Yup.string()
  .required("This field is required")
  .min(1)
  .max(40);

const descriptionValidation = Yup.string()
  .required("Description is required")
  .min(1)
  .max(200);

const notesValiation = Yup.string().max("300").nullable();

const generalTextValidationWithoutRequired = Yup.string()
  .min(1)
  .max(40)
  .nullable();

const generalBooleanValidation = Yup.boolean().required(
  "This field is required"
);

export const newPasswordValidationWithoutRequired = Yup.string()
  .min(
    8,
    "Password must be at least 8 characters containing uppercase, lowercase, number, and symbol."
  )
  .max(40, "Password must be at most 40  characters long.")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,40}$/,
    "Password must be at least 8 characters containing uppercase, lowercase, number, and symbol."
  );

export const SIGNIN_VALIDATION_SCHEMA = Yup.object().shape({
  email: emailValidation,
  password: nameValidation,
});

export const ADD_CAR_VALIDATION_SCHEMA = Yup.object().shape({
  year: vehicleYear,
  make: vehicleNumber,
  model: vehicleModel,
  email: emailValidation,
  lastName: nameValidation,
  firstName: nameValidation,
  poNumber: phoneValidation,
  status: generalTextValidation,
  deliveryDate: generalTextValidationWithoutRequired,
  vehiclePoNumber: generalTextValidationWithoutRequired,

  carPart: Yup.array().of(
    Yup.object().shape({
      price: generalTextValidationWithoutRequired,
      ourPrice: generalTextValidationWithoutRequired,
      supplier: generalTextValidationWithoutRequired,
      status: generalTextValidation,
      quantity: generalNumberValidation,
      description: descriptionValidation,
      partNumber: generalNumberValidation,
      deliveryDate: generalTextValidation,
      notes: notesValiation,
    })
  ),

  TechnicianIds: Yup.array().of(
    Yup.object().shape({
      isNotify: generalBooleanValidation,
      TechnicianId: generalNumberValidation,
    })
  ),
});

export const ADD_TECHNICIAN_VALIDATION_SCHEMA = Yup.object().shape({
  email: emailValidation,
  lastName: nameValidation,
  firstName: nameValidation,
  role: generalTextValidation,
  phoneNumber: phoneValidation,
  password: newPasswordValidation,
  specialization: generalTextValidation,
  availability: generalBooleanValidation,
});

export const UPDATE_TECHNICIAN_VALIDATION_SCHEMA = Yup.object().shape({
  id: Yup.string(),
  partsDeliveryAlertDays: generalTextValidation,
  vehicleDeliveryAlertDays: generalTextValidation,
  vehicleFollowUpNotificationDays: generalTextValidation,
});

export const UPDATE_VEHICLE_VALIDATION_SCHEMA = Yup.object().shape({
  status: generalTextValidation,
});

export const FORGOT_PASSWORD_SCHEMA = Yup.object().shape({
  email: emailValidation,
});

export const VERIFY_OTP_VALIDATION_SCHEMA = Yup.object().shape({
  email: emailValidation,
  token: generalNumberValidation,
});

export const NEW_PASSWORD_VALIDATION_SCHEMA = Yup.object().shape({
  email: emailValidation,
  newPassword: newPasswordValidation,
});
