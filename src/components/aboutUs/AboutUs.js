import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    getAboutUsInfoThunk,
    getAboutUsThunk,
} from "../../store/actions/aboutUsAction";
import "./aboutUs.scss";
import {baseUrl, token} from "../../config/config";
import axios from "axios";
import Swal from "sweetalert2";
import AboutUsDown from "./AboutUsDown";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}


const AboutUs = () => {
    const dispatch = useDispatch();
    const aboutUsData = useSelector((state) => state?.aboutUsReducer.aboutUs);
    const aboutUsInfo = useSelector((state) => state.aboutUsReducer.aboutUsInfo);
    const [value, setValue] = React.useState(0);
    const [image,setImage] = useState()
    //values
    const [subTitleHy, setSubTitleHy] = useState("");
    const [subTitleEn, setSubTitleEn] = useState("");
    const [textHy,setTextHy] = useState()
    const [textEn,setTextEn] = useState()
    //
    useEffect(() => {
        dispatch(getAboutUsThunk());
        dispatch(getAboutUsInfoThunk());
        console.clear()
    }, []);

    useEffect(() => {
        setSubTitleHy(aboutUsData && aboutUsData.titleHy);
        setSubTitleEn(aboutUsData && aboutUsData.titleEn);
        setTextHy(aboutUsData && aboutUsData.textHy)
        setTextEn(aboutUsData && aboutUsData.textEn)
        setImage(aboutUsData && aboutUsData.image)

    }, [aboutUsData, aboutUsInfo]);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleSubmit = () => {
        axios
            .post(
                `${baseUrl}/homeAbout/edit`,
                {
                    titleHy: subTitleHy,
                    titleEn: subTitleEn,
                    textHy,textEn,image
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Succses",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleFile = (e) => {
        let files = [];
        Object.keys(e.target.files).map((f) => {
            if (f === "Length") return;
            files.push(e.target.files[0]);
        });
        uploadImage(files);
    };

    let arrOfImages = [];
    const uploadImage = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "armcodingImage");
        formData.append("cloud_name", "armcoding");
        axios
            .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
            .then((res) => {
                arrOfImages.push(res.data.url);
                setImage(res.data.url)
            });
    };


    return (
        <Box m={3} className="boxHeigth">
            <h2 mt={3} mb={3}>
                About Us Settings
            </h2>
            <h2 mt={3} mb={3}>
                Up
            </h2>
            <Box sx={{width: "100%"}}>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab label="Arm" {...a11yProps(0)} />
                        <Tab label="En" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <h3 mt={3} mb={3} style={{
                        margin: "10px 0 10px 0"
                    }}>
                        Title
                    </h3>
                    <TextField value={subTitleHy} onChange={e=>setSubTitleHy(e.target.value)} variant="outlined" />
                    <h3 mt={3} mb={3} style={{
                        margin: "10px 0 10px 0"
                    }}>
                        Text
                    </h3>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="8"
                        value={textHy}
                        onChange={(e) => setTextHy(e.target.value)}
                        maxLength="600"
                        cols="60"
                        className="textareaText"
                    />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <h3 mt={3} mb={3} style={{
                        margin: "10px 0 10px 0"
                    }}>
                        Title
                    </h3>
                    <TextField value={subTitleEn} onChange={e=>setSubTitleEn(e.target.value)} variant="outlined" />
                    <h3 mt={3} mb={3} style={{
                        margin: "10px 0 10px 0"
                    }}>
                        Text
                    </h3>
                    <textarea
                        id="w3review"
                        name="textRu"
                        rows="8"
                        maxLength="600"
                        cols="60"
                        className="textareaText"
                        value={textEn}
                        onChange={(e) => setTextEn(e.target.value)}
                    />
                </TabPanel>
            </Box>
            <Box>
                {
                    image && (
                        <div>
                            <img src={image} alt="image"/>
                            <Button color="secondary" variant="contained" component="label" style={{
                                margin: "0 17px 35px 43px"
                            }}>
                                Edit
                                <input type="file" hidden multiple onChange={handleFile}/>
                            </Button>
                        </div>
                    )
                }
            </Box>
            <Button color="secondary" variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
            <AboutUsDown data={aboutUsInfo}/>
        </Box>
    );
};

export default AboutUs;
