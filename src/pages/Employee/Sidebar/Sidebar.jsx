import { useState , useEffect  } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../utils/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RoomServiceIcon from "@mui/icons-material/RoomService";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import {VscFeedback} from "react-icons/vsc"
import {FaMoneyBillWaveAlt} from "react-icons/fa"
import {MdDeviceUnknown} from "react-icons/md"
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../utils/firebase"
import AuthUser from "../../../utils/AuthUser";
import { fontSize } from "@mui/system";

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
  const [employee,setEmployee] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const {http , user} =AuthUser();
  
  const avatarRef = ref(storage, user.avatar)

  useEffect(() => {
    const fetchData = async () => {
      await http
        .get(`/employee/account-employee`)
        .then((resolve) => {
          console.log(resolve);
          setEmployee(resolve.data.customer);
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

  // if (!avatarUrl) {
  //   return <div>Loading...</div>;
  // }

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
                  {employee?.username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {employee?.name}
                </Typography>
              </Box>
            </Box>
          )}

          {/* LIST ITEM */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/employee/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Customer
            </Typography>
          

            <Item
              title="Manage Customer"
              to="/employee/customer"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Feedback"
              to="/employee/feedback"
              icon={<VscFeedback  style={{fontSize: 'x-large'}}/>}
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
              title="Bill Room"
              to="/employee/billroom"
              icon={<FaMoneyBillWaveAlt  style={{fontSize: 'x-large'}}/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Facility"
              to="/employee/facility"
              icon={<MdDeviceUnknown style={{fontSize: 'x-large'}}/>}
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
              title="Bill Service"
              to="/employee/service"
              icon={<RoomServiceIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Bill Extra Service"
              to="/employee/extraservice"
              icon={<RoomServiceIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              News
            </Typography>
            <Item
              title="Manger News"
              to="/employee/news"
              icon={<RoomServiceIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
