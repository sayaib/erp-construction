import React from "react";
import {
  Box,
  IconButton,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { tokens } from "../../theme";

function SearchBox() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");
  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor={colors.primary[400]}
      borderRadius="3px"
      sx={{ display: `${isXsDevices ? "none" : "flex"}` }}
    >
      <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
      <IconButton type="button" sx={{ p: 1 }}>
        <SearchOutlined />
      </IconButton>
    </Box>
  );
}

export default SearchBox;
