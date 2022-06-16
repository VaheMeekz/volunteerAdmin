import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersThunk} from "../../store/actions/orderAction";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import axios from "axios";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (<div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (<Box sx={{p: 3}}>
            <Typography>{children}</Typography>
        </Box>)}
    </div>);
}

TabPanel.propTypes = {
    children: PropTypes.node, index: PropTypes.number.isRequired, value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Orders = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const [titleHy, setTitleHy] = useState()
    const [titleEn, setTitleEn] = useState()
    const [textHy, setTextHy] = useState()
    const [textEn, setTextEn] = useState()
    const [titleOneHy, setTitleOneHy] = useState()
    const [titleOneEn, setTitleOneEn] = useState()
    const [descriptionOneHy, setDescriptionOneHy] = useState()
    const [descriptionOneEn, setDescriptionOneEn] = useState()
    const [titleTwoHy, setTitleTwoHy] = useState()
    const [titleTwoEn, setTitleTwoEn] = useState()
    const [descriptionTwoHy, setDescriptionTwoHy] = useState()
    const [descriptionTwoEn, setDescriptionTwoEn] = useState()
    const [titleThreeHy, setTitleThreeHy] = useState()
    const [titleThreeEn, setTitleThreeEn] = useState()
    const [descriptionThreeHy, setDescriptionThreeHy] = useState()
    const [descriptionThreeEn, setDescriptionThreeEn] = useState()
    const [image, setImage] = useState()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const data = useSelector((state) => state.orderReducer.orders);

    useEffect(() => {
        dispatch(getOrdersThunk());
        console.clear()
    }, []);

    useEffect(() => {
        data && setTitleHy(data.titleHy)
        data && setTitleEn(data.titleEn)
        data && setTextHy(data.textHy)
        data && setTextEn(data.textEn)

        data && setTitleOneHy(data.titleOneHy)
        data && setTitleOneEn(data.titleOneEn)
        data && setDescriptionOneHy(data.descriptionOneHy)
        data && setDescriptionOneEn(data.descriptionOneEn)

        data && setTitleTwoHy(data.titleTwoHy)
        data && setTitleTwoEn(data.titleTwoEn)
        data && setDescriptionTwoHy(data.descriptionTwoHy)
        data && setDescriptionTwoEn(data.descriptionTwoEn)

        data && setTitleThreeHy(data.titleThreeHy)
        data && setTitleThreeEn(data.titleThreeEn)
        data && setDescriptionThreeHy(data.descriptionThreeHy)
        data && setDescriptionThreeEn(data.descriptionThreeEn)

        data && setImage(data.image)
    }, [data])

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

    const handlerEdit = () => {
        axios
            .post(`${baseUrl}/homeWeDo/edit`, {
                titleHy,
                titleEn,
                textHy,
                textEn,
                image,
                titleOneHy,
                titleOneEn,
                descriptionOneHy,
                descriptionOneEn,
                titleTwoHy,
                titleTwoEn,
                descriptionTwoHy,
                descriptionTwoEn,
                titleThreeHy,
                titleThreeEn,
                descriptionThreeHy,
                descriptionThreeEn
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Succsess!", showConfirmButton: false, timer: 1500,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (<Box m={3} className="boxHeigth">
        <h2 t={3} mb={3}>
            What we Do
        </h2>

        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Hy" {...a11yProps(0)} />
                    <Tab label="En" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box>
                    <h3>Title</h3>
                    <TextField value={titleHy} onChange={e => setTitleHy(e.target.value)} fullWidth/>
                    <h3>Text</h3>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="6"
                        maxLength="400"
                        cols="100"
                        className="textareaText"
                        value={textHy}
                        onChange={(e) => setTextHy(e.target.value)}
                    />
                </Box>
                <hr/>
                <Box>
                    <h3>First Title </h3>
                    <TextField value={titleOneHy} onChange={e => setTitleOneHy(e.target.value)} fullWidth/>
                    <h3>First Description</h3>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="6"
                        maxLength="400"
                        cols="100"
                        className="textareaText"
                        value={descriptionOneHy}
                        onChange={(e) => setDescriptionOneHy(e.target.value)}
                    />
                </Box>
                <hr/>
                <Box>
                    <h3>Second Title</h3>
                    <TextField value={titleTwoHy} onChange={e => setTitleTwoHy(e.target.value)} fullWidth/>
                    <h3>Second Description</h3>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="6"
                        maxLength="400"
                        cols="100"
                        className="textareaText"
                        value={descriptionTwoHy}
                        onChange={(e) => setDescriptionTwoHy(e.target.value)}
                    />
                </Box>
                <hr/>
                <Box>
                    <h3>Third Title</h3>
                    <TextField value={titleThreeHy} onChange={e => setTitleThreeHy(e.target.value)} fullWidth/>
                    <h3>Third Description</h3>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="6"
                        maxLength="400"
                        cols="100"
                        className="textareaText"
                        value={descriptionThreeHy}
                        onChange={(e) => setDescriptionThreeHy(e.target.value)}
                    />
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box>
                    <h3>Title</h3>
                    <TextField value={titleEn} onChange={e => setTitleEn(e.target.value)} fullWidth/>
                    <h3>Text</h3>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="6"
                        maxLength="400"
                        cols="100"
                        className="textareaText"
                        value={textEn}
                        onChange={(e) => setTextEn(e.target.value)}
                    />
                </Box>
                <hr/>
                <Box>
                    <h3>First Title</h3>
                    <TextField value={titleOneEn} onChange={e => setTitleOneEn(e.target.value)} fullWidth/>
                    <h3>First Description</h3>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="6"
                        maxLength="400"
                        cols="100"
                        className="textareaText"
                        value={descriptionOneEn}
                        onChange={(e) => setDescriptionOneEn(e.target.value)}
                    />
                </Box>
                <hr/>
                <Box>
                    <h3>Second Title</h3>
                    <TextField value={titleTwoEn} onChange={e => setTitleTwoEn(e.target.value)} fullWidth/>
                    <h3>Second Description</h3>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="6"
                        maxLength="400"
                        cols="100"
                        className="textareaText"
                        value={descriptionTwoEn}
                        onChange={(e) => setDescriptionTwoEn(e.target.value)}
                    />
                </Box>
                <hr/>
                <Box>
                    <h3>Third Title</h3>
                    <TextField value={titleThreeEn} onChange={e => setTitleThreeEn(e.target.value)} fullWidth/>
                    <h3>Third Description</h3>
                    <textarea
                        id="w3review"
                        name="textHy"
                        rows="6"
                        maxLength="400"
                        cols="100"
                        className="textareaText"
                        value={descriptionThreeEn}
                        onChange={(e) => setDescriptionThreeEn(e.target.value)}
                    />
                </Box>
            </TabPanel>

            <Box>
                {image && (<div>
                    <img src={image} alt="image" width={500} height={300}/>
                    <Button color="secondary" variant="contained" component="label" style={{
                        margin: "10px 0 30px 10px"
                    }}>
                        Edit Image
                        <input type="file" hidden multiple onChange={handleFile}/>
                    </Button>
                </div>)}
            </Box>
            <Box>
                <Button onClick={handlerEdit} color="secondary" variant="contained" component="label" >Submit</Button>

            </Box>
        </Box>
    </Box>);
};

export default Orders;
