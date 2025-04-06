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
import { Offline } from "react-detect-offline";

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
      {/* <Offline>
      <div className="bg-red-800 p-2 max-w-xl md:max-w-2xl text-white text-sm md:text-base md:text-lg fixed bottom-2 left-10 md:left-28 border border-transparent rounded-md">
         You are currently offline. Please check your internet connection.
        </div>
      </Offline> */}
    </>
  );
}

export default App;
// Ayou15@gmail.com
// 123456
