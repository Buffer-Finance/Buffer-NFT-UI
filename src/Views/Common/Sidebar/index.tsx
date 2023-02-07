import { ClickAwayListener, IconButton } from '@mui/material';
import { useState } from 'react';
import SidebarCss from './styles';
import { useGlobal } from '@Contexts/Global';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from 'react-reveal/Fade';
import { getTabs, ITab } from 'src/Config/getTabs';
import { BufferLogoComponent } from '../Navbar/BufferLogo';
import { NavLink } from 'react-router-dom';
import SidebarCollapseIcon from '@SVG/Elements/sidebarCollpaseIcon';
// import usePages from "Hooks/Utilities/usePageInfo";

const SideBar: React.FC<any> = () => {
  const newPageNavElements = 9;
  const { state, dispatch } = useGlobal();
  const options = getTabs();

  const handleChange = (link: string) => {
    handleClose();
    window.open(link);
  };

  const handleClose = () => {
    dispatch({
      type: 'UPDATE_SIDEBAR_STATE',
    });
  };

  return (
    <SidebarCss>
      {state.sidebar_active ? null : (
        <div className="overlay" onClick={handleClose}></div>
      )}

      <div
        className={`bg-1 sidebar ${
          state.sidebar_active ? '' : 'sidebar-closed'
        } min1000:!hidden`}
      >
        <div className="sidebar_container flex-col">
          <div className="icon_container mb-6">
            <div
              className="flex items-center"
              role={'button'}
              onClick={
                () => {}
                // router.push({
                //   pathname: "/",
                // })
              }
            >
              <BufferLogoComponent />
            </div>
            <IconButton className="collapse-icon" onClick={handleClose}>
              <SidebarCollapseIcon />
            </IconButton>
          </div>
          {options.map((option, key) => {
            if (key >= newPageNavElements || option.isExternalLink) {
              return (
                <button
                  key={option.name}
                  className={`item `}
                  onClick={() => {
                    handleChange(option.to);
                  }}
                >
                  {/* <SidebarIcon id={option.id} active={active} /> */}
                  <div className="name">{option.name}</div>
                </button>
              );
            }
            return option.subTabs.length > 0 ? (
              // active=router.asPath.includes(option.subTab.slug);
              <SubTabDropDown tab={option} defaultName={'Lol'} key={key} />
            ) : (
              <NavLink
                key={option.name}
                to={option.to}
                className={({ isActive }) =>
                  `item ${isActive ? 'active bg-4' : ''} 
          `
                }
              >
                <div className="name">{option.name}</div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </SidebarCss>
  );
};
export default SideBar;

const SubTabDropDown = ({
  tab,
  defaultName,
}: {
  tab: ITab;
  defaultName: string;
}) => {
  const { dispatch } = useGlobal();
  const option = tab;
  const [open, setOpen] = useState(false);
  const handleClickAway = () => {
    setOpen(false);
  };
  const handleClose = () => {
    dispatch({
      type: 'UPDATE_SIDEBAR_STATE',
    });
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <>
        <button
          className={`flex-bw unset sr xmpr  text-6
          `}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="flex-center dropdown">
            {/* <SidebarIcon id={option.id} active={active} /> */}
            <div className="name">{defaultName}</div>
          </div>
          <div className="liftup">
            <ExpandMoreIcon className={`arrow ${!open ? '' : 'rotate'} `} />
          </div>
        </button>
        <Fade center when={open} collapse duration={500}>
          <div className="dropdown-box">
            {option.subTabs.map((subTab: ITab, index: number) => {
              return (
                <NavLink
                  key={option.name}
                  to={option.to}
                  className={({ isActive }) =>
                    `dropdown-item ${isActive ? 'active' : ''} 
          `
                  }
                >
                  <div className="name" role={'button'} onClick={handleClose}>
                    {option.name}
                  </div>
                </NavLink>
              );
            })}
          </div>
        </Fade>
      </>
    </ClickAwayListener>
  );
};
