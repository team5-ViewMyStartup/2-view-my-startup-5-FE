import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import Landing from "./pages/Landing/Landing";
// import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
<<<<<<< HEAD
import CompareStatus from "./pages/CompareStatus/CompareStatus";
import StartupList from "./pages/StartupList/StartupList";
import Details from "./pages/Details/Details";
// import CompareStatus from "./pages/CompareStatus/CompareStatus";
import Investment from "./pages/InvestmentStatus/Investment";
import Compare from "./pages/Compare/Compare";
=======
import StartupList from "./pages/StartupList/StartupList";
import Details from "./pages/Details/Details";
import CompareStatus from "./pages/CompareStatus/CompareStatus";
import Investment from "./pages/InvestmentStatus/Investment";
import Compare from "./pages/CompareStatus/CompareStatus";
>>>>>>> e6297a2a17192883d8f04b34941dd8a984039b6c

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/all-company" element={<StartupList />} />
          <Route path="/details/:companyId" element={<Details />} />
          <Route path="/invest-status" element={<Investment />} />
          <Route path="/compare-status" element={<CompareStatus />} />
<<<<<<< HEAD
=======

>>>>>>> e6297a2a17192883d8f04b34941dd8a984039b6c
          {/* <Route> 여기에 페이지들을 추가</Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
