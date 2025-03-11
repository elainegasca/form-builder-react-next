import React from "react";
import { RouteObject, useRouteError } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import FormBuilderPage from "../pages/FormBuilderPage";
import TemplatesPage from "../pages/TemplatesPage";
import Error404 from "../pages/Error404";

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "formbuilder/:formId",
        element: <FormBuilderPage />,
      },
      {
        path: "/",
        element: <TemplatesPage />,
      },
    ],
  },
];

export default routes;
