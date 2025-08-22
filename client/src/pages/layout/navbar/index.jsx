import {
  Box,
  IconButton,
  InputBase,
  useMediaQuery,
  useTheme,
  Avatar,
  Typography,
  Button,
  ButtonBase,
} from "@mui/material";

import { tokens, ColorModeContext } from "../../../theme";
import { useContext, useState } from "react";
import {
  LogoutOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SearchOutlined,
  ArrowRightOutlined,
  SettingsOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.png";
import { ToggledContext } from "../../../App";
import { useAuthStore } from "../../../store/authStore";

const Navbar = () => {
  const { logout, user } = useAuthStore();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { toggled, setToggled } = useContext(ToggledContext);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");
  const colors = tokens(theme.palette.mode);

  const [showCard, setShowCard] = useState(false);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton
          sx={{ display: `${isMdDevices ? "flex" : "none"}` }}
          onClick={() => setToggled(!toggled)}
        >
          <MenuOutlined />
        </IconButton>
      </Box>

      <Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
        <IconButton onClick={logout}>
          <LogoutOutlined />
        </IconButton>
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <IconButton onClick={() => setShowCard((prev) => !prev)}>
          <PersonOutlined />
        </IconButton>
      </Box>

      {/* Sliding Card */}
      <Box
        position="fixed"
        top="0"
        right="0"
        height="100vh"
        width="300px"
        bgcolor={colors.primary[400]}
        boxShadow="0px 0px 10px rgba(0,0,0,0.2)"
        display="flex"
        flexDirection="column"
        p={2}
        zIndex={1300}
        sx={{
          transform: showCard ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h3></h3>
          <IconButton onClick={() => setShowCard(false)}>
            <CloseOutlined />
          </IconButton>
        </Box>
        {/* Add content for the card */}
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt="avatar"
            src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
              {user !== null ? user.name : ""}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              color={colors.greenAccent[500]}
            >
              {user !== null ? user.userType : ""}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              color={colors.greenAccent[500]}
            >
              {user !== null ? user.email : ""}
            </Typography>
            <Button>Change Password</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
