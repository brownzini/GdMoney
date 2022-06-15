//React
import * as React from "react";

//Material UI
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";
import ListMenu from "./MenuOfContextAccount/ListMenu";

//Icons
import StorageIcon from "@mui/icons-material/Storage";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SettingsIcon from "@mui/icons-material/Settings";

type Prop = {
  currentPage: string;
};

export default function AccountMenu({ currentPage }: Prop) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Link href="/" underline="none">
          <Typography
            sx={{
              minWidth: 100,
              padding: "18px",
              outline: "none",
              borderBottom:
                currentPage === "Home" ? "3px solid #AE16F0" : "none",
              "&:hover": {
                color: "#491061",
                borderBottom:
                  currentPage === "Home" ? "3px solid #491061" : "none",
              },
            }}
          >
            Home
          </Typography>
        </Link>
        <Link href="/marketplace" underline="none">
          <Typography
            sx={{
              minWidth: 100,
              borderBottom:
                currentPage === "Marketplace" ? "3px solid #AE16F0" : "none",
              "&:hover": {
                color: "#491061",
                borderBottom:
                  currentPage === "Marketplace" ? "3px solid #491061" : "none",
              },
            }}
          >
            Marketplace
          </Typography>
        </Link>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background:
                  "linear-gradient(to right, #3f107a, #760da5, #6b14a2, #7c17b4)",
              }}
            >
              M
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Username
        </MenuItem>

        <Divider />
        
        <Link 
          href="/my-collectables" 
          underline="none"
          sx={{
            color: 'gray'
          }}
        >
          <ListMenu fieldName="Your Collectables">
            <StorageIcon fontSize="small" />
          </ListMenu>
        </Link>

        <Link 
          href="/transactions_history" 
          underline="none"
          sx={{
            color: 'gray'
          }}
        >
          <ListMenu fieldName="Transactions History">
            <ManageSearchIcon fontSize="small" />
          </ListMenu>
        </Link>

        <Link 
          href="/settings" 
          underline="none"
          sx={{
            color: 'gray'
          }}
        >
          <ListMenu 
          fieldName="Settings"
          >
            <SettingsIcon fontSize="small" />
          </ListMenu>
        </Link>

        <Divider />

        <Link 
          href="/logout" 
          underline="none"
          sx={{
            color: 'gray'
          }}
        >
          <ListMenu fieldName="Logout">
            <Logout fontSize="small" />
          </ListMenu>
        </Link>
      </Menu>
    </React.Fragment>
  );
}

//#491061