import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "./components/ui/toaster";
import AuthProvider from "./pages/auth/authProvider";
import { appConfigs } from "./lib/data";
import { AppProvider } from "./components/appProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ExplorePage from "./pages/ExplorePage";
import { Provider } from "./components/provider";
import { ProtectedPage } from "./pages/auth/protected-page";
import UsaSpecialOffers from "./pages/UsaSpecialOffers";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider defaultTheme="dark" storageKey="virtudial-ui-theme">
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path={appConfigs.paths.auth.signUp}
                element={<AuthProvider pages="signup" />}
              />
              <Route
                path={appConfigs.paths.auth.signIn}
                element={<AuthProvider pages="login" />}
              />
              <Route
                path={appConfigs.paths.auth.requestAccountVerification}
                element={<AuthProvider pages="request-account-verification" />}
              />
              <Route
                path={appConfigs.paths.auth.verifyAccount + ":id"}
                element={<AuthProvider pages="verify-account" />}
              />
              <Route
                path={appConfigs.paths.auth.forgetPassword}
                element={<AuthProvider pages="forget-password" />}
              />
              <Route
                path={appConfigs.paths.auth["reset-password"] + ":id"}
                element={<AuthProvider pages="reset-password" />}
              />
              <Route
                path={appConfigs.paths["explore"].default}
                element={
                  <Provider>
                    <ExplorePage />
                  </Provider>
                }
              />
              <Route
                path={appConfigs.paths["explore"]["usa-special-offers"]}
                element={
                  <ProtectedPage>
                    <Provider>
                      <UsaSpecialOffers />
                    </Provider>
                  </ProtectedPage>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
