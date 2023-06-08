import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../utils/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BedIcon from "@mui/icons-material/Bed";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { getDownloadURL, ref } from "firebase/storage";
import AuthUser from "../../../utils/AuthUser";
import { storage } from "../../../utils/firebase"

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [admin, setAdmin] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { http, user } = AuthUser();

  const avatarRef = ref(storage, user.avatar)

  useEffect(() => {
    const fetchData = async () => {
      await http
        .get(`/admin/account-admin`)
        .then((resolve) => {
          console.log(resolve);
          setAdmin(resolve.data.customer);
        })
        .catch((reject) => {
          console.log(reject);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      getDownloadURL(avatarRef).then((url) => {
        setAvatarUrl(url);
      })
    };

    fetchImage();
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={avatarUrl}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {admin?.username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {admin?.name}
                </Typography>
              </Box>
            </Box>
          )}

          {/* LIST ITEM */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Account
            </Typography>
            <Item
              title="Manage Staff"
              to="/admin/staff"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Manage Customer"
              to="/admin/customer"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Department"
              to="/admin/department"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Room
            </Typography>
            <Item
              title="Room Type"
              to="/admin/roomtype"
              icon={<BedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Equipment"
              to="/admin/equipment"
              icon={<RoomServiceIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Service
            </Typography>
            <Item
              title="Service"
              to="/admin/service"
              icon={<RoomServiceIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Service Type"
              to="/admin/servicetype"
              icon={<RoomServiceIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Info
            </Typography>
            <Item
              title="FeedBack"
              to="/admin/feedback"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="New"
              to="/admin/news"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
       
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Statistical"
              to="/admin/statistical"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Profile Form"
              to="/admin/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/admin/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/admin/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography> */}
            {/* <Item
              title="Bar Chart"
              to="/admin/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/admin/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/admin/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Geography Chart"
              to="/admin/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
