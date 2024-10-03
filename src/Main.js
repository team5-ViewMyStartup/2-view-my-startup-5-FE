import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import StartupList from "./pages/StartupList/StartupList";
import Details from "./pages/Details/Details";
import CompareStatus from "./pages/CompareStatus/CompareStatus";
import Investment from "./pages/InvestmentStatus/Investment";
import Compare from "./pages/CompareStatus/CompareStatus";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/all-company" element={<StartupList />} />
          <Route path="details" element={<Details />} />
          {/* <Route path="/compare-status" element={<CompareStatus />} /> */}
          <Route path="/invest-status" element={<Investment />} />
          <Route path="/compare-status" element={<CompareStatus />} />
          {/* <Route> 여기에 페이지들을 추가</Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
