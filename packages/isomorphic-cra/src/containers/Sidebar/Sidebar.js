import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
// import options from "./options";
import Scrollbars from "@iso/components/utility/customScrollBar";
import Menu from "@iso/components/uielements/menu";
import appActions from "@iso/redux/app/actions";
import Logo from "@iso/components/utility/logo";
import SidebarWrapper from "./Sidebar.styles";
import SidebarMenu from "./SidebarMenu";

import {
  IoIosBook as BookIcon,
  IoIosArrowBack as ArrowBAckIcon,
  IoIosArrowDown as ArrowDownIcon,
  //
  IoIosLeaf as LeafIcon,
  // IoIosPaperPlane,
  // IoIosStar,
  // IoLogoFreebsdDevil,
  // IoMdHammer,
  // IoMdMusicalNotes,
  // IoMdRainy,
  // IoMdRose,
  // IoMdTrophy,
  // IoMdRocket,
  // IoMdLeaf,
  // IoLogoVk,
  // IoLogoXing,
  // IoIosMoon,
  // IoIosGift,
  // IoIosEgg,
  // IoIosBonfire,
} from "react-icons/io";

// const iconPublisher = [
//   <IoIosLeaf />,
//   <IoIosPaperPlane />,
//   <IoIosStar />,
//   <IoLogoFreebsdDevil />,
//   <IoMdHammer />,
//   <IoMdMusicalNotes />,
//   <IoMdRainy />,
//   <IoMdRose />,
//   <IoMdTrophy />,
//   <IoMdRocket />,
//   <IoMdLeaf />,
//   <IoLogoVk />,
//   <IoLogoXing />,
//   <IoIosMoon />,
//   <IoIosGift />,
//   <IoIosEgg />,
//   <IoIosBonfire />,
// ];
import queryList from "@iso/cra/src/containers/Topbar/searchQueries";

const { Sider } = Layout;

const { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed } =
  appActions;

export default function Sidebar() {
  const dispatch = useDispatch();

  const { view, openKeys, collapsed, openDrawer, current, height } =
    useSelector((state) => state.App);

  const customizedTheme = useSelector(
    (state) => state.ThemeSwitcher.sidebarTheme
  );
  const { recipeValues } = useSelector((state) => state.recipeValues);

  const uniqueRecipes = recipeValues
    .map((recipe) => recipe.publisher)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((_recipe) => {
      const recipe = _recipe.replaceAll(" ", "-").toLowerCase();
      return {
        key: recipe,
        label: `sidebar.${recipe}`,
        // leftIcon: iconPublisher[0],
      };
    });

  const option_two = [
    {
      key: "publisher",
      label: `sidebar.publisher`,
      leftIcon: <BookIcon />,
      children: uniqueRecipes,
    },
    {
      key: "list",
      label: `sidebar.list`,
      leftIcon: <LeafIcon />,
      children: queryList.map((query) => {
        return {
          key: query,
          label: `sidebar.${query}`,
          // leftIcon: iconPublisher[0],
        };
      }),
    },
  ];

  function handleClick(e) {
    dispatch(changeCurrent([e.key]));
    if (view === "MobileView") {
      setTimeout(() => {
        dispatch(toggleCollapsed());
        // dispatch(toggleOpenDrawer());
      }, 100);

      // clearTimeout(timer);
    }
  }
  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find(
      (key) => !(openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = openKeys.find(
      (key) => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  }

  const getAncestorKeys = (key) => {
    const map = {
      sub3: ["sub2"],
    };
    return map[key] || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? "vertical" : "inline";
  const onMouseEnter = (event) => {
    if (collapsed && openDrawer === false) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const styling = {
    backgroundColor: customizedTheme.backgroundColor,
  };

  const submenuStyle = {
    backgroundColor: "rgba(0,0,0,0.3)",
    // backgroundColor: "red",
    color: customizedTheme.textColor,
  };
  const submenuColor = {
    color: customizedTheme.textColor,
  };

  return (
    <SidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={240}
        className="isomorphicSidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={styling}
      >
        <Logo collapsed={isCollapsed} />
        <Scrollbars style={{ height: height - 70 }}>
          <Menu
            onClick={handleClick}
            theme="dark"
            className="isoDashboardMenu"
            mode={mode}
            // openKeys={isCollapsed ? [] : openKeys}
            openKeys={isCollapsed ? [] : ["publisher", ...openKeys]}
            selectedKeys={current}
            onOpenChange={onOpenChange}
            inlineCollapsed={isCollapsed}
          >
            {/* {options.map((singleOption) => ( */}
            {option_two.map((singleOption) => (
              <SidebarMenu
                key={singleOption.key}
                expandIcon={({ isOpen }) => {
                  if (isOpen) return <ArrowDownIcon />;
                  return <ArrowBAckIcon />;
                }}
                submenuStyle={submenuStyle}
                submenuColor={submenuColor}
                singleOption={singleOption}
              />
            ))}
          </Menu>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}
