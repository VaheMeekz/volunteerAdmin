import NotFound from "../../components/404/404";
import AboutUs from "../../components/aboutUs/AboutUs";
import Banners from "../../components/banners/Banners";
import Category from "../../components/category/Category";
import ContactUs from "../../components/contactUs/ContactUs";
import Info from "../../components/info/Info";
import Login from "../../components/login/Login";
import Orders from "../../components/orders/Orders";
import Products from "../../components/products/Products";
import Subscribers from "../../components/subscribers/subscribers";
import Users from "../../components/users/Users";
import {
    ABOUTUS_PAGE, ADMIN_PAGE,
    BANNERS_PAGE,
    CATEGORY_PAGE,
    CONTACTS_PAGE, DELEVERY_PAGE, FOOTER_PAGE,
    INFO_PAGE, JURISPRUDECE_PAGE,
    LOGIN_PAGE,
    NOTFOUND_PAGE,
    ORDERS_PAGE,
    PRODUCT_PAGE,
    SUBSCRIBERS_PAGE,
    USERS_PAGE, VIDEOS_PAGE,
} from "./urls";
import Delevery from "../../components/delevery/Delevery";
import Footer from "../../components/footer/Fotter";
import Choose from "../../components/choose/Choose";
import Jurisrudece from "../../components/jurisrudece/Jurisrudece";
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Admins from "../../components/admins/Admins";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Videos from "../../components/videos/Videos";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
export const isAuthPages = [
    {id: 2, path: PRODUCT_PAGE, name: "Products", Component: Products,icon:<DashboardIcon/>},
    {id: 8, path: CATEGORY_PAGE, name: "Category", Component: Category,icon:<CategoryIcon/>},
    {id: 9, path: ORDERS_PAGE, name: "Orders", Component: Orders,icon:<ProductionQuantityLimitsIcon/>},
    {id: 3, path: ABOUTUS_PAGE, name: "About Us", Component: AboutUs,icon:<InfoIcon/>},
    {id:21,path: VIDEOS_PAGE,name:"Videos",Component:Videos,icon:<VideoLibraryIcon/> },
    {id: 6, path: BANNERS_PAGE, name: "Banners", Component: Banners,icon:<InsertPhotoIcon/>},
    {id: 11, path: FOOTER_PAGE, name: "Footers", Component: Footer,icon:<BuildIcon/>},
    {id: 4, path: CONTACTS_PAGE, name: "Contact Us", Component: ContactUs,icon:<InfoIcon/>},
    {id: 5, path: SUBSCRIBERS_PAGE, name: "Subscribers", Component: Subscribers,icon:<GroupIcon/>},
    {id: 7, path: INFO_PAGE, name: "Info", Component: Info,icon:<InfoIcon/>},
    {id:13,path: ADMIN_PAGE,name:"Admins",Component:Admins,icon: <AutoFixHighIcon/>}
];
// {id: 1, path: USERS_PAGE, name: "Users", Component: Users,icon:<GroupIcon/>},
// {id: 10, path: DELEVERY_PAGE, name: "Delivery", Component: Delevery,icon:<ElectricCarIcon/>},
// {id: 12, path: CHOOSE_PAGE, name: "Choose", Component: Choose,icon:<BuildIcon/>},
// {id: 3, path: JURISPRUDECE_PAGE, name: "Jurisrudece", Component: Jurisrudece,icon:<DashboardIcon/>},

export const isntAuthPages = [
    {id: 1, path: LOGIN_PAGE, name: "Login", Component: Login,icon:<LockOpenIcon/>},
];

export const notFoundPages = [
    {id: 1, path: NOTFOUND_PAGE, name: "404", Component: NotFound},
];
