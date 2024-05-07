import { getItem } from "../utils/storage";

export const useDriverDetails = () => {
  const driverData = getItem("DRIVER_DETAILS");
  const DRIVER_DETAILS = JSON.parse(driverData as string);

  const { _id, email, firstname, lastname, phone, avatar, vehicle } =
    DRIVER_DETAILS;

  return {
    _id,
    email,
    firstname,
    lastname,
    phone,
    avatar,
    vehicle,
  };
};
