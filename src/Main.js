import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import StartupList from "./pages/StartupList/StartupList";
import Details from "./pages/Details/Details";
import CompareStatus from "./pages/CompareStatus/CompareStatus";
import Investment from "./pages/InvestmentStatus/Investment";
import ComparePage from "./pages/ComparePage/ComparePage";
import CompareResult from "./pages/CompareResult/CompareResult";
import NotFoundPage from "./components/NotFoundPage";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../src/utils/jwtUtils";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          alert("30분이 지났습니다. 다시 로그인해주세요.");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("토큰 에러 발생:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/all-company" element={<StartupList />} />
          <Route path="/details/:companyId" element={isLoggedIn ? <Details /> : <Login />}></Route>
          <Route path="/invest-status" element={<Investment />} />
          <Route path="/compare-status" element={<CompareStatus />} />
          <Route path="/compare-result" element={<CompareResult />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route> 여기에 페이지들을 추가</Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
