import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "../pages/Profile";
import { LayoutDefault } from "../layout/LaoyoutDefault";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutDefault>
              <Profile />
            </LayoutDefault>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
