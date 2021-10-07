import { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaListUl, FaHeart } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import nacho from "../assets/nacho.png";
import "react-pro-sidebar/dist/css/styles.css";
import "../App.css";

const SideNav = ({ moviesScreen, favoritesScreen, changeScreenHandler }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <ProSidebar
      style={{ height: "100vh", position: "relative" }}
      collapsed={collapsed}
      breakPoint="md"
      width={"12vw"}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "20px",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "2vh",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={nacho}
              style={{
                overflow: "hidden",
                height: "2vh",
              }}
              alt=""
            />
            {!collapsed && (
              <span style={{ paddingLeft: "10px" }}>Nacho Time</span>
            )}
          </div>
          {
            <FaListUl
              style={{
                cursor: "pointer",
              }}
              onClick={() => setCollapsed(!collapsed)}
            />
          }
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu>
          <MenuItem
            active={true}
            icon={<BiCameraMovie />}
            onClick={() => changeScreenHandler(moviesScreen)}
          >
            Movies
          </MenuItem>
          <MenuItem
            icon={<FaHeart />}
            onClick={() => changeScreenHandler(favoritesScreen)}
          >
            Favorites
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu>
          <MenuItem icon={<FiSettings />}>Settings</MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SideNav;
