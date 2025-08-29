import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/ui/loader";
import { routes } from "./constant/routes";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// Create a client
const queryClient = new QueryClient();
const NotFoundPage = React.lazy(() => import("./pages/not-found"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              Component ? (
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              ) : null
            }
          />
        ))}

        {/* Catch-all route for 404 page */}
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
