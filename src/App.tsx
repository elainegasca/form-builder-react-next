import React from "react";
import routes from "./utils/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import BackdropCircularProgressComponent from "./components/BackdropCircularProgressComponent";
import ModalStrip from "./components/ModalStrip";
import "./assets/css/plugins.css";
import "./assets/css/style.css";
import "./index.css";

function App() {
  const router = createBrowserRouter(routes, {
    basename: "/dashboard/builder/",
  });
  console.log("test from bundle5");
  return (
    <>
      <Provider store={store}>
        <BackdropCircularProgressComponent />
        <ModalStrip />
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
