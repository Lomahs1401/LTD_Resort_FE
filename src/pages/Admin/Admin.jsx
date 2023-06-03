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
import ManageAdmin from "./ManageAdmin/ManageAdmin"
import Customer from "./Customer/Customer";
import Bill from "./Bill/Bill";
import Bar from "./Bar/Bar";
import Form from "./Form/Form";
import Line from "./Line/Line";
import Pie from "./Pie/Pie";
import FAQ from "./FAQ/FAQ";
import Room from "./Room/Room";
import RoomArea from "./RoomArea/RoomArea";
import RoomFloor from "./RoomFloor/RoomFloor";
import RoomType from "./RoomType/RoomType";
import Equiment from "./Equipment/Equipment";
import CreateRoom from "./CreateRoom/CreateRoom";
import Service from "./Service/Service";
import ServiceType from "./ServiceType/ServiceType";
import CreateService from "./CreateService/CreateService";
import AccordionDetails from "./AccountDetail/AccountDetail";
import Geography from "./Geography/Geography";
import Calendar from "./Calendar/Calendar";
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
              <Route path="/manageadmin" element={<ManageAdmin />} />
              <Route path="/room" element={<Room />} />
              <Route path="/roomarea" element={<RoomArea />} />
              <Route path="/roomfloor" element={<RoomFloor />} />
              <Route path="/roomtype" element={<RoomType />} />
              <Route path="/equipment" element={<Equiment />} />
              {/* <Route path="/createroom" element={< CreateRoom />} /> */}
              <Route path="/service" element={<Service />} />
              <Route path="/servicetype" element={<ServiceType />} />

              {/* <Route path="/createservice" element={< CreateService />} /> */}
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />

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
