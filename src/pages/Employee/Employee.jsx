import React, { useState } from "react";
import { ColorModeContext, useMode } from "../../utils/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./Topbar/Topbar";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Customer from "./Customer/Customer"
import Bill from "./Bill/Bill"
import Feedback from "./FeedBack/FeedBack";
import BillRoom from "./BillRoom/BillRoom";
import Facility from "./Facility/Facility";
import Service from "./Service/Service"
import ExtraService from "./ExtraService/ExtraService";
import News from "./News/News";
import AccordionDetails from "./AccountDetail/AccountDetail";
import styles from "./Employee.module.scss";
import classNames from "classnames/bind";



const cx = classNames.bind(styles);

const Employee = () => {
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
              <Route path="/details" element={<AccordionDetails />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/bill" element={<Bill />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/billroom" element={<BillRoom />} />
              <Route path="/facility" element={<Facility />} />
              <Route path="/service" element={<Service />} />
              <Route path="/extraservice" element={<ExtraService />} />
              <Route path="/news" element={<News />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Employee;
