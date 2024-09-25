import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {/* <Route path="/register" element={<Register />}></Route> */}
          {/* <Route> 여기에 페이지들을 추가</Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
