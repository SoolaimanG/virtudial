import { ReactNode } from "react";
import { CountryCode } from "libphonenumber-js";
import {
  ColumnFiltersInstance,
  ColumnOrderInstance,
  ColumnPinningInstance,
  ColumnSizingInstance,
  CoreInstance,
  ExpandedInstance,
  GlobalFacetingInstance,
  GlobalFilterInstance,
  GroupingInstance,
  HeadersInstance,
  PaginationInstance,
  RowData,
  RowPinningInstance,
  RowSelectionInstance,
  SortingInstance,
  VisibilityInstance,
} from "@tanstack/react-table";

export type countriesType = {
  name: string;
  code: string;
  capital: string;
  region: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  language: {
    code: string;
    name: string;
    iso639_2?: string;
    nativeName?: string;
  };
  flag: string;
};

export type DotsTypes = {
  widthLength?: number;
  heightLength?: number;
  widthSpacing?: string;
  heightSpacing?: string;
  className?: string;
};

export type GlassmorphismTypes = {
  opacity: number;
  className?: string;
  children: ReactNode;
};

export type logoStylesTypes = "normal" | "bold" | "italic";

export type logoTypes = {
  className?: string;
  style?: logoStylesTypes;
};

export type apiResponseStatus =
  | "FORGOT-PASSWORD"
  | "NO-ACCOUNT"
  | "LOGIN"
  | "VERIFY-EMAIL"
  | "NOT-YET-AVAILABLE";

export interface apiResponse<T = any> {
  status: apiResponseStatus | string;
  message: string;
  data: T;
}

export type authProviderPages =
  | "login"
  | "signup"
  | "forget-password"
  | "verify-account"
  | "request-account-verification"
  | "reset-password";

export interface AuthProviderProps {
  pages: authProviderPages;
}

export interface IAuthentication {
  salt: string;
  password: string;
  sessionToken: string;
}

export type verificationMeans = "email" | "phoneNumber";

export interface IUser {
  id: string;
  email: string;
  phoneNumber: string;
  countryCode?: CountryCode;
  isAccountActive: boolean;
  isAccountVerified: boolean;
  authentication?: IAuthentication;
  verificationMeans?: verificationMeans;
}

export interface ILoginProps {
  title?: string;
  description?: string;
}

export interface IAppProvider {
  status: { status: apiResponseStatus | null; message: string };
  loginProps: ILoginProps;
  setStatus: (payload: apiResponseStatus | null, message?: string) => void;
  setLoginProps: (payload: ILoginProps) => void;
}

export interface INativeName {
  official: string;
  common: string;
}

export interface IFlags {
  png: string;
  svg: string;
  alt: string;
}

export interface IName {
  common: string;
  official: string;
  nativeName: {
    nno: INativeName;
    nob: INativeName;
    smi: INativeName;
  };
}

export interface ICountry {
  flags: IFlags;
  name: IName;
}

export interface marqueeCard {
  name: string;
  username: string;
  body?: string;
  img: string;
}

export interface usaSpecialOffers {
  id: string;
  flag: string;
  countryName: string;
  state: string;
  availableNumbers: number;
  areaCode: string;
  updatedAt: string;
}

export interface usaStateNumbers {
  availableNumbers: number;
  updatedAt: null | number;
  _id: string;
  state: string;
  areaCode: string;
}

export interface ITable<TData extends RowData>
  extends CoreInstance<TData>,
    HeadersInstance<TData>,
    VisibilityInstance<TData>,
    ColumnOrderInstance<TData>,
    ColumnPinningInstance<TData>,
    RowPinningInstance<TData>,
    ColumnFiltersInstance<TData>,
    GlobalFilterInstance<TData>,
    GlobalFacetingInstance<TData>,
    SortingInstance<TData>,
    GroupingInstance<TData>,
    ColumnSizingInstance,
    ExpandedInstance<TData>,
    PaginationInstance<TData>,
    RowSelectionInstance<TData> {}
