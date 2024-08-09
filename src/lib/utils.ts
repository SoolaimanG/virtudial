import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { appConfigs, joinWaitListSchema } from "./data";
import {
  apiResponse,
  apiResponseStatus,
  ICountry,
  IUser,
  usaStateNumbers,
  verificationMeans,
} from "./types";
import { z } from "zod";
import { toast } from "../components/ui/use-toast";
import Cookie from "js-cookie";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import queryString from "query-string";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "virtudial-4301a.firebaseapp.com",
  projectId: "virtudial-4301a",
  storageBucket: "virtudial-4301a.appspot.com",
  messagingSenderId: "57949473140",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-9C4373PNV3",
};

export const app = initializeApp(firebaseConfig);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const api = axios.create({ baseURL: appConfigs.paths.api.domain });

export const errorMessageAndStatus = (error: any) => {
  const message = error?.response?.data?.message;
  const status = error?.response?.data?.status as apiResponseStatus;

  return { message, status };
};

export const _joinWaitList = async (
  values: z.infer<typeof joinWaitListSchema>,
  _function?: () => void
) => {
  const api = new VirtuDialAPI();
  try {
    const res = await api.joinWaitList(values.email);
    _function && _function();
    toast({
      title: "Wait-list joined successfully",
      description: res.message,
    });
  } catch (error) {
    toast({
      title: `Something went wrong: ${errorMessageAndStatus(error).status}`,
      description: errorMessageAndStatus(error).message,
      variant: "destructive",
    });
  }
};

export function formatTime(seconds: number) {
  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad minutes and seconds with leading zeros if necessary
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  // Return formatted time as "MM:SS"
  return `${formattedMinutes}:${formattedSeconds}`;
}

export const isCurrentPage = (
  page: string,
  options?: { level: number; pageLevel: number }
) => {
  const { level = 1, pageLevel = 1 } = options || {};

  const path = location.pathname.split("/");
  const _page = page.split("/")[pageLevel];

  const _isCurrentPage = path[level]?.toLowerCase() === _page?.toLowerCase();

  return _isCurrentPage;
};

export const getEuropeCountries = async () => {
  const res: { data: ICountry[] } = await axios.get(
    `https://restcountries.com/v3.1/region/europe?fields=flags,name`
  );
  return res.data;
};

export const verifySessionIsStillActive = async (
  userId: string,
  exp: number,
  userEmail: string
) => {
  const currentTime = Date.now() / 1000; // Convert to seconds
  const twoHoursInSeconds = 60 * 60 * 2; // Two hours in seconds
  const timeDiff = exp - currentTime;

  if (!userId || !userEmail || !exp)
    throw new Error("Invalid or expired token");

  const shouldRefreshToken = timeDiff <= twoHoursInSeconds;
  const isSessionStillActive = timeDiff > 0;

  return {
    shouldRefreshToken,
    isSessionStillActive,
    remainingTime: timeDiff,
  };
};

export const getCallbackUrl = () => {
  const callbackUrl = queryString.parse(location.search) as {
    callbackUrl: string | null;
  };
  return callbackUrl;
};

export class VirtuDialAPI {
  constructor() {}

  get getAccessToken() {
    const cookie = Cookie.get("access-token");
    return cookie;
  }

  setAccessToken(token: string) {
    const keepAliveForTheNextTwoDays = 60 * 60 * 24 * 2 * 1000;
    Cookie.set("access-token", token, {
      expires: keepAliveForTheNextTwoDays,
      sameSite: "strict",
    });
  }

  async joinWaitList(email: string) {
    const res: { data: apiResponse } = await api.post(
      appConfigs.paths.api.joinWaitList,
      { email }
    );
    return res.data;
  }

  async messageSupport(name: string, userEmail: string, message: string) {
    const res: { data: apiResponse } = await api.post(
      appConfigs.paths.api.messageSupport,
      { name, userEmail, message }
    );
    return res.data;
  }

  async createUser(
    email: string,
    phoneNumber: string,
    countryCode: string,
    password: string,
    agreeToAdvertisingEmails = false
  ) {
    const res: { data: IUser } = await api.post(
      appConfigs.paths.api.auth.signUp,
      { email, phoneNumber, password, countryCode, agreeToAdvertisingEmails }
    );
    return res.data;
  }

  async loginUser(email: string, password: string) {
    const res: { data: apiResponse<IUser & { token: string }> } =
      await api.post(appConfigs.paths.api.auth.localLogin, { email, password });
    this.setAccessToken(res.data.data.token);
    return res.data;
  }

  async requestAccountVerification(
    email?: string,
    phoneNumber?: string,
    verificationMeans: verificationMeans = "email"
  ) {
    const res: {
      data: apiResponse<{ id: string; verificationMeans: verificationMeans }>;
    } = await api.post(appConfigs.paths.api.auth.requestAccountVerification, {
      email,
      phoneNumber,
      verificationMeans,
    });
    return res.data;
  }

  async verifyAccount(id: string, code: string) {
    const res: { data: apiResponse } = await api.post(
      appConfigs.paths.api.auth.verifyAccount + id,
      { code }
    );
    return res.data.data;
  }

  async getVerificationStatus(id: string) {
    const res = await api.get(
      appConfigs.paths.api.auth["get-verification-status"] + id
    );
    return res.data;
  }

  async requestForgetPasswordChange(id: string) {
    const res: { data: apiResponse } = await api.post(
      appConfigs.paths.api.auth.requestPasswordChange,
      { email: id, phoneNumber: id }
    );
    return res.data;
  }

  async resetPassword(password: string, id: string) {
    const res: { data: apiResponse } = await api.post(
      appConfigs["paths"]["api"]["auth"]["changePassword"] + id,
      { password }
    );
    return res.data;
  }

  async continueWithGoogle(access_token: string) {
    const res: {
      data: apiResponse<IUser & { firstTimeLogin?: boolean; token: string }>;
    } = await api.post(appConfigs.paths.api.auth["continue-with-google"], {
      access_token,
    });
    this.setAccessToken(res.data.data.token);
    return res.data;
  }

  async completeAccountSetup(
    email: string,
    phoneNumber: string,
    agreeToAdvertisingEmails: boolean = false
  ) {
    const res: { data: apiResponse<IUser> } = await api.post(
      appConfigs.paths.api.auth["complete-account-set-up"],
      { email, phoneNumber, agreeToAdvertisingEmails },
      { headers: { Authorization: this.getAccessToken } }
    );

    return res.data;
  }

  async isUserAuthenticated() {
    const res: { data: apiResponse<IUser> } = await api.get(
      appConfigs.paths.api.auth["is-user-authenticated"],
      { headers: { Authorization: this.getAccessToken } }
    );
    return res.data;
  }

  async getUsaStatesAndAvailableNumbers() {
    const res: { data: apiResponse<usaStateNumbers[]> } = await api.get(
      appConfigs.paths.api.numbers["get-usa-states"]
    );
    return res.data;
  }
}
//
