import {Box, Button} from "@mui/material";
import React, {useState, useEffect} from "react";
import "../banners/banner.scss";
import {useSelector, useDispatch} from "react-redux";
import {getAboutUsBannerThunk, getHomeBannerThunk} from "../../store/actions/bannersActions";
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ArrowDropUpSharpIcon from '@mui/icons-material/ArrowDropUpSharp';
import HomeImageItem from "./HomeImageItem";
import AboutBannerItem from "./AboutBannerItem";

const AbouUsBanner = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.bannersReducer.aboutBanner);
    const [openSection, setOPenSection] = useState(false)

    useEffect(() => {
        dispatch(getAboutUsBannerThunk());
    }, []);

    console.log(data,"++++")

    return (
        <Box m={3} className="infoBox">
            <h2 mt={3} mb={3}>
                About Us Page Banner
            </h2>
            <Box>
                {
                    openSection ? (
                        <Button variant="outlined" color="secondary" onClick={() => setOPenSection(!openSection)}>
                            <ArrowDropUpSharpIcon/>
                        </Button>
                    ) : (
                        <Button variant="outlined" color="secondary" onClick={() => setOPenSection(!openSection)}>
                            <ArrowDropDownSharpIcon/>
                        </Button>)
                }
            </Box>
            {openSection ? (
                <Box>
                    {
                        data && data.map(i => {
                            return <AboutBannerItem key={i.id} data={i}/>
                        })
                    }
                </Box>) : null}
        </Box>
    );
};

export default AbouUsBanner;
