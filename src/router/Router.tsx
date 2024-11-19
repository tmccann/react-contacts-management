import { RouteObject, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/mainLayout/MainLayout";
import ContactsPage from "../pages/contacts/ContactsPage";
import AppointmentsPage from "../pages/appointments/ApointmentsPage";
import About from "../pages/about/About";
import Privacy from "../pages/privacy/Privacy";
import Terms from "../pages/terms/Terms";

const routes: RouteObject[] = [
  {
    path: "/", // The root route path is "/"
    element: <MainLayout />, // This route renders the MainLayout component
    children: [
      { index: true, element: <ContactsPage /> }, // Renders contacts at "/"
      { path: "contacts", element: <ContactsPage /> },
      { path: "appointments", element: <AppointmentsPage /> },
      { path: "about", element: <About /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
    ],
  },
];

// array need to be passed to browser router to complete router object
const router = createBrowserRouter(routes);
export default router;
