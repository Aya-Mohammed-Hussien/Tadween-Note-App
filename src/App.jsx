import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./components/Layout/Layout";
import AuthContext from "./Context/AuthContext";
import ModalContext from "./Context/ModalContext";
import NoteContext from "./Context/NoteContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const myRouters = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element:<ProtectedRoutes><Home /></ProtectedRoutes>},
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <AuthContext>
        <NoteContext>
          <ModalContext>
            <RouterProvider router={myRouters} />
          </ModalContext>
        </NoteContext>
      </AuthContext>
    </>
  );
}

export default App;
// Ayou15@gmail.com
// 123456
