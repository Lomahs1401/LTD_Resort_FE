import React, { useState } from "react";
import { ColorModeContext, useMode } from "../../utils/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./Topbar/Topbar";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Staff from "./Staff/Staff";
import ViewStaff from "./ViewStaff/ViewStaff";
import CreateStaff from "./CreateStaff/CreateStaff";
import Department from "./Department/Department"
import ViewAdmin from "./ViewAdmin/ViewAdmin";
import Customer from "./Customer/Customer";
import Bill from "./Bill/Bill";
import RoomType from "./RoomType/RoomType";
import Equiment from "./Equipment/Equipment";
import Service from "./Service/Service";
import ServiceType from "./ServiceType/ServiceType";
import FeedBack from "./FeedBack/FeedBack";
import News from "./News/News"
import Statistical from "./Statistical/Statistical";
import AccordionDetails from "./AccountDetail/AccountDetail";
import styles from "./Admin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Admin = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={cx("admin")}>
          <Sidebar />
          <main className={cx("content")}>
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} exact />
              <Route path="/staff" element={<Staff />} />
              <Route path="/viewstaff" element={<ViewStaff />} />
              <Route path="/createstaff" element={<CreateStaff />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/bill" element={<Bill />} />
              <Route path="/department" element={<Department />} />
              <Route path="/viewadmin" element={<ViewAdmin />} />
              {/* <Route path="/room" element={<Room />} />
              <Route path="/roomarea" element={<RoomArea />} />
              <Route path="/roomfloor" element={<RoomFloor />} /> */}
              <Route path="/roomtype" element={<RoomType />} />
              <Route path="/equipment" element={<Equiment />} />
              <Route path="/service" element={<Service />} />
              <Route path="/servicetype" element={<ServiceType />} />
              <Route path="/feedback" element={<FeedBack />} />
              <Route path="/statistical" element={<Statistical />} />
              <Route path="/news" element={<News />} />
              <Route path="/details" element={<AccordionDetails />} />
              {/* <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Admin;
