import "./sidebar.scss";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {isAuthPages} from "../../utils/routing/routes";
import {useLocation} from 'react-router-dom';
import logo from "../../utils/images/logo.png"

const Sidebar = () => {
    const isAuth = useSelector((state) => state.isAuthReducer.isAuth);
    let location = useLocation();
    return (
        <div className="sidebar">
            <div className="top">

          <span className="logo" style={{
              fontSize: "30px"
          }}>
              <img src={logo} alt="logo"  style={{
                  width: "80%",
                  height: "32px"
              }}/>
          </span>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    {isAuth
                        ? isAuthPages.map(({id, path, name, icon}) => {
                            return (
                                <div key={id}>
                                    <Link to={path} style={{textDecoration: "none"}} key={id}
                                          className={location.pathname === path ? "activeLink" : "pasiveLink"}
                                    >
                                        <li>
                                            {icon}
                                            {/*<DashboardIcon className="icon"/>*/}
                                            <span style={{
                                                fontSize: "20px"
                                            }}>{name}</span>
                                        </li>
                                    </Link>
                                    <hr className="hra"/>
                                </div>
                            );
                        })
                        : null}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
