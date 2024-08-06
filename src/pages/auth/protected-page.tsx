import { FC, Fragment, ReactNode } from "react";
import { useAuthentication } from "../../lib/hooks";
import { PageLoader } from "../../components/page-loader";
import { Navigate } from "react-router-dom";
import { appConfigs } from "../../lib/data";

export const ProtectedPage: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading, error } = useAuthentication();

  if (isLoading) return <PageLoader />;

  if (error) return <Navigate to={appConfigs.paths.auth.signIn} />;

  return <Fragment>{children}</Fragment>;
};
