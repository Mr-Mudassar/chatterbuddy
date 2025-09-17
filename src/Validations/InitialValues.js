export const SIGNIN_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const ADD_CAR_INITIAL_VALUES = {
  year: "",
  make: "",
  model: "",
  email: "",
  status: "",
  poNumber: "",
  lastName: "",
  firstName: "",
  deliveryDate: "",
  vehiclePoNumber: "",
  carPart: [
    {
      price: "",
      notes: "",
      status: "",
      ourPrice: "",
      quantity: "",
      supplier: "",
      partNumber: "",
      description: "",
      deliveryDate: "",
    },
  ],

  TechnicianIds: [
    {
      TechnicianId: "",
      isNotify: false,
    },
  ],
};

export const ADD_TECHNICIAN_INITIAL_VALUES = {
  email: "",
  password: "",
  lastName: "",
  firstName: "",
  phoneNumber: "",
  specialization: "",
  availability: true,
  role: "Technician",
};

export const UPDATE_TIME_PERIOD_INITIAL_VALUES = {
  id: "",
  partsDeliveryAlertDays: "",
  vehicleDeliveryAlertDays: "",
  vehicleFollowUpNotificationDays: "",
};

export const UPDATE_TECHNICIAN_INITIAL_VALUES = {
  status: "",
};

export const FORGOT_PASSWORD_INITIAL_VALUES = {
  email: "",
};

export const VERIFY_OTP_INITIAL_VALUES = {
  email: "",
  token: "",
};

export const NEW_PASSWORD_INITIAL_VALUES = {
  email: "",
  newPassword: "",
};
