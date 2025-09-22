import "./App.css";
import { Suspense } from "react";
import Layout from "./Layouts/index";
import routes from "./Routes/AllRoutes";
import { Toaster } from "react-hot-toast";
import { PublicRoute } from "./Routes/PublicRoutes";
import { PrivateRoute } from "./Routes/PrivateRoutes";
import LoadingScreen from "@/Components/LoadingScreen";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function withLayout(WrappedComponent) {
  const ComponentWithLayout = (props) => (
    <Layout>
      <WrappedComponent {...props} />
    </Layout>
  );

  ComponentWithLayout.displayName = `WithLayout(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithLayout;
}

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Component = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    {!route.isPublic ? (
                      <PrivateRoute
                        props={route}
                        role={route?.role}
                        Component={withLayout(Component)}
                      />
                    ) : (
                      <PublicRoute
                        props={route}
                        role={route?.role}
                        Component={Component}
                      />
                    )}
                  </Suspense>
                }
              />
            );
          })}

          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <div className="h-screen w-screen flex justify-center items-center bg-red-200 ">
                  <div className="border border-red-700 px-28 py-10 rounded-sm">
                    <p className="text-2xl text-red-700 font-semibold mb-12">
                      Page Not Found
                    </p>

                    <Link
                      to="/"
                      className="border border-green-800 text-green-800 px-4 py-3 rouded-sm hover:bg-green-300 font-semibold mt-6 text-sm"
                    >
                      Return to HOME page
                    </Link>
                  </div>
                </div>
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
