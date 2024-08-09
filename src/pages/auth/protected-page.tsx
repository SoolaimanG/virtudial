import { FC, Fragment, ReactNode } from "react";
import { useAuthentication } from "../../lib/hooks";
import { PageLoader } from "../../components/page-loader";
import { Navigate } from "react-router-dom";
import { appConfigs } from "../../lib/data";
import queryString from "query-string";

export const ProtectedPage: FC<{ children: ReactNode }> = ({ children }) => {
  const callbackUrl = location.pathname + location.search;

  const qs = queryString.stringify({ callbackUrl });
  const { isLoading, error } = useAuthentication();

  if (isLoading) return <PageLoader />;

  if (error)
    return <Navigate to={appConfigs.paths.auth.signIn + `?${qs || "/"}`} />;

  return <Fragment>{children}</Fragment>;
};
