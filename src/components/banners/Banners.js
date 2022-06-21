import React, {useEffect} from "react";
import {Box} from "@mui/material";
import HomeBanner from "../bannerComponents/HomeBanner";
import AbouUsBanner from "../bannerComponents/AboutUsBanner";

const Banners = () => {
    useEffect(() => console.clear(), [])
    return (
        <Box m={3} className="boxHeigth">
            <h1 mt={3} mb={3}>
                Banners Settings
            </h1>
            <HomeBanner/>
            <hr/>
            <AbouUsBanner/>
        </Box>
    );
};

export default Banners;
