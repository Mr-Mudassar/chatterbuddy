import "./App.css";
import { Suspense } from "react";
import Layout from "./Layouts/index";
import routes from "./Routes/AllRoutes";
import { Toaster } from "react-hot-toast";
import { PublicRoute } from "./Routes/PublicRoutes";
import { PrivateRoute } from "./Routes/PrivateRoutes";
import LoadingScreen from "@/Components/LoadingScreen";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NotFound from "@/Pages/NotFound";

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
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
