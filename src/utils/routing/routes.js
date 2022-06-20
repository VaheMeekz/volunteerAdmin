import NotFound from "../../components/404/404";
import AboutUs from "../../components/aboutUs/AboutUs";
import Banners from "../../components/banners/Banners";
import Category from "../../components/category/Category";
import ContactUs from "../../components/contactUs/ContactUs";
import Info from "../../components/info/Info";
import Login from "../../components/login/Login";
import Orders from "../../components/orders/Orders";
import Products from "../../components/products/Products";
import {
    ABOUTUS_PAGE, ADMIN_PAGE,
    BANNERS_PAGE,
    CATEGORY_PAGE,
    CONTACTS_PAGE, EVENTS_PAGE,
    INFO_PAGE,
    LOGIN_PAGE,
    NOTFOUND_PAGE, ORDERS_PAGE, PARTNER_PAGE,
    PRODUCT_PAGE, PROJECT_PAGE, STATICS_PAGE,
} from "./urls";
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Admins from "../../components/admins/Admins";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Subscribers from "../../components/subscribers/subscribers";
import Users from "../../components/users/Users";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Files from "../../components/files/Files";
import Events from "../../components/events/Events";
export const isAuthPages = [
    {id: 2, path: PRODUCT_PAGE, name: "News", Component: Products, icon: <DashboardIcon/>},
    {id: 8, path: CATEGORY_PAGE, name: "Works", Component: Category, icon: <CategoryIcon/>},
    {id: 156, path: PROJECT_PAGE, name: "Project", Component: Users, icon: <DashboardIcon/>},
    {id: 3, path: ABOUTUS_PAGE, name: "About Us", Component: AboutUs, icon: <InfoIcon/>},
    {id: 1, path: ORDERS_PAGE, name: "What we do ", Component: Orders, icon: <CategoryIcon/>},
    {id: 6, path: BANNERS_PAGE, name: "Banners", Component: Banners, icon: <InsertPhotoIcon/>},
    {id: 4, path: CONTACTS_PAGE, name: "Contact Us", Component: ContactUs, icon: <InfoIcon/>},
    {id: 7, path: INFO_PAGE, name: "Info", Component: Info, icon: <InfoIcon/>},
    {id: 13, path: ADMIN_PAGE, name: "Admins", Component: Admins, icon: <AutoFixHighIcon/>},
    {id: 189, path: PARTNER_PAGE, name: "Partners", Component: Subscribers, icon: <BuildIcon/>},
    {id: 9, path: STATICS_PAGE, name: "Files", Component: Files, icon: <UploadFileIcon/>},
    {id: 961, path: EVENTS_PAGE, name: "Events", Component: Events, icon: <InfoIcon/>},

];

export const isntAuthPages = [
    {id: 1, path: LOGIN_PAGE, name: "Login", Component: Login, icon: <LockOpenIcon/>},
];

export const notFoundPages = [
    {id: 1, path: NOTFOUND_PAGE, name: "404", Component: NotFound},
];
