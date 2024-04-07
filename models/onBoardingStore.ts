import { create } from "zustand";
import { baseUrl } from "../constants/baseUrl";
import { getItem, setItem } from "../utils/storage";
import { vehicleTypes } from "../types/vehicleTypes";

type OnboardingStoreProps = {
  _type: "drivers";
  avatar: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  dl_front: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  dl_back: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  selfie: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  selfie_link: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  vehicle: {
    car: boolean;
    motorbike: boolean;
    bicycle: boolean;
  };
  expo_push_token: string;
  verified: false;
  onboarded: boolean;
  setLoginDetails: (email: string, password: string) => void;
  setDriverNames: (firstname: string, lastname: string) => void;
  setPhone: (phone: string) => void;
  setVehicle: (vehicle: vehicleTypes) => void;
  setAvatar: (avatar: string) => void;
  setDlFront: (dl_front: string) => void;
  setDlBack: (dl_back: string) => void;
  setSelfie: (selfie: string, selfie_link: string) => void;
  createDriver: () => Promise<void>;
};

export const useOnboardingStore = create<OnboardingStoreProps>(
  (set, state) => ({
    _type: "drivers",
    avatar: {
      _type: "image",
      asset: {
        _ref: "",
        _type: "reference",
      },
    },
    dl_front: {
      _type: "image",
      asset: {
        _ref: "",
        _type: "reference",
      },
    },
    dl_back: {
      _type: "image",
      asset: {
        _ref: "",
        _type: "reference",
      },
    },
    selfie: {
      _type: "image",
      asset: {
        _ref: "",
        _type: "reference",
      },
    },
    selfie_link: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    vehicle: {
      car: false,
      motorbike: false,
      bicycle: false,
    },
    onboarded: false,
    verified: false,
    expo_push_token: getItem("expo_push_token") || "",
    setLoginDetails: (email, password) => {
      set({ email, password });
      console.log(state().email, state().password);
      console.log(state().expo_push_token);
    },
    setDriverNames: (firstname, lastname) => {
      set({ firstname, lastname });
      console.log(state().firstname, state().lastname);
    },

    setPhone: (phone) => set({ phone }),
    setVehicle: (vehicle) => {
      const vehicleObject = {
        Car: {
          car: true,
          motorbike: false,
          bicycle: false,
        },
        MotorBike: {
          car: false,
          motorbike: true,
          bicycle: false,
        },
        Bicycle: {
          car: false,
          motorbike: false,
          bicycle: true,
        },
      };
      set({ vehicle: vehicleObject[vehicle as keyof typeof vehicleObject] });
      console.log(state().vehicle);
    },
    setAvatar: (avatar) =>
      set({
        avatar: {
          ...state().avatar,
          asset: {
            _ref: avatar,
            _type: "reference",
          },
        },
      }),
    setDlFront: (dl_front) => {
      set({
        dl_front: {
          ...state().dl_front,
          asset: { _ref: dl_front, _type: "reference" },
        },
      });
      console.log(state().dl_front);
    },
    setDlBack: (dl_back) => {
      set({
        dl_back: {
          ...state().dl_back,
          asset: { _ref: dl_back, _type: "reference" },
        },
      });
      console.log(state().dl_back);
    },
    setSelfie: (selfie, selfie_link) => {
      set({
        selfie: {
          ...state().selfie,
          asset: { _ref: selfie, _type: "reference" },
        },
        selfie_link,
      });
      console.log(state().selfie);
    },
    createDriver: async () => {
      const {
        _type,
        firstname,
        lastname,
        email,
        phone,
        password,
        avatar,
        dl_front,
        dl_back,
        selfie,
        expo_push_token,
        vehicle,
      } = state();

      const latitude = getItem("latitude");
      const longitude = getItem("longitude");
      const location = {
        lat: Number(latitude),
        lng: Number(longitude),
      };

      const newDriver = {
        _type,
        firstname,
        lastname,
        email,
        phone,
        password,
        avatar,
        dl_front,
        dl_back,
        selfie,
        expo_push_token,
        verified: false,
        onboarded: false,
        vehicle,
        location,
      };

      const res = await fetch(`${baseUrl}/drivers/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDriver),
      });
      const data = await res.json();
      const { status, _id, avatar: driverAvatar } = data;
      setItem("_id", `${_id}`);
      setItem("email", `${email}`);
      setItem("firstname", `${firstname}`);
      setItem("lastname", `${lastname}`);
      setItem("phone", `${phone}`);
      setItem("avatar", `${driverAvatar}`);
      const driverDetails = {
        _id,
        email,
        firstname,
        lastname,
        phone,
        avatar,
      };
      setItem("driverDetails", JSON.stringify(driverDetails));
      return data;
    },
  })
);
