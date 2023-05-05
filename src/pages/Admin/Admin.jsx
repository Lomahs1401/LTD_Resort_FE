import React, { useState } from 'react'
import { ColorModeContext, useMode } from '../../utils/theme'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import Team from './Team/Team';
import Invoices from './Invoices/Invoices';
import Contacts from './Contacts/Contacts';
import Bar from './Bar/Bar';
import Form from './Form/Form';
import Line from './Line/Line';
import Pie from './Pie/Pie';
import FAQ from './FAQ/FAQ';
import Geography from './Geography/Geography';
import Calendar from './Calendar/Calendar';
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
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default Admin