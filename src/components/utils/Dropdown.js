import { AccountCircle } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";

const Dropdown = (props) => {
  const className = props.className;
  const id = props.id;
  const menus = props.menus;
  const anchorEl = props.anchorEl;
  const setAnchorEl = props.setAnchorEl;
  const open = Boolean(anchorEl);

  const close = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  console.log(anchorEl);
  return (
    <Menu
      className={className}
      anchorEl={anchorEl}
      id={id}
      open={open}
      onClose={close}
      onClick={close}
      slotProps={{
        paper: {
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
            "&::before": {
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
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {menus.map((menu, i) => {
        return (
          <MenuItem key={"menuitem-" + i} onClick={menu.clickFunc}>
            {menu.icon}
            {menu.name}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default Dropdown;
