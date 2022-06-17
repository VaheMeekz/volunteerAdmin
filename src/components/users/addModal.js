import React, {useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    overflow: "scroll",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const AddModal = ({openAdd,setOpenAdd}) => {

    const [titleOneHy, setTitleOneHy] = useState()
    const [titleOneEn, setTitleOneEn] = useState()
    const [descriptionOneHy, setDescriptionOneHy] = useState()
    const [descriptionOneEn, setDescriptionOneEn] = useState()
    const [image, setImage] = useState()
    const [titleTwoHy, setTitleTwoHy] = useState()
    const [titleTwoEn, setTitleTwoEn] = useState()
    const [descriptionTwoHy, setDescriptionTwoHy] = useState()
    const [descriptionTwoEn, setDescriptionTwoEn] = useState()
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleFile = (e) => {
        let files = [];
        Object.keys(e.target.files).map((f) => {
            if (f === "Length") return;
            files.push(e.target.files[0]);
        });
        uploadImage(files);
    };

    const uploadImage = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "armcodingImage");
        formData.append("cloud_name", "armcoding");
        axios
            .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
            .then((res) => {
                setImage(res.data.url);
            });
    };

    const handlerEdit = () => {
        axios
            .post(`${baseUrl}/project/`, {
                titleOneHy,
                titleOneEn,
                descriptionOneHy,
                descriptionOneEn,
                image,
                titleTwoHy,
                titleTwoEn,
                descriptionTwoHy,
                descriptionTwoEn
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    setOpenAdd(false)
                    Swal.fire({
                        position: "center", icon: "success", title: "Deleted", showConfirmButton: false, timer: 1500,
                    });
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <Modal
                open={openAdd}
                onClose={()=>setOpenAdd(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit
                    </Typography>
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Hy" {...a11yProps(0)} />
                                <Tab label="En" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <TextField variant="standard" value={titleOneHy} onChange={e => setTitleOneHy(e.target.value)}
                                       fullWidth/>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="8"
                                value={descriptionOneHy}
                                onChange={(e) => setDescriptionOneHy(e.target.value)}
                                maxLength="600"
                                cols="60"
                                className="textareaText"
                            />
                            <TextField variant="standard" value={titleTwoHy} onChange={e => setTitleTwoHy(e.target.value)}
                                       fullWidth/>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="8"
                                value={descriptionTwoHy}
                                onChange={(e) => setDescriptionTwoHy(e.target.value)}
                                maxLength="600"
                                cols="60"
                                className="textareaText"
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TextField variant="standard" value={titleOneEn} onChange={e => setTitleOneEn(e.target.value)}
                                       fullWidth/>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="8"
                                value={descriptionOneEn}
                                onChange={(e) => setDescriptionOneEn(e.target.value)}
                                maxLength="600"
                                cols="60"
                                className="textareaText"
                            />
                            <TextField variant="standard" value={titleTwoEn} onChange={e => setTitleTwoEn(e.target.value)}
                                       fullWidth/>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="8"
                                value={descriptionTwoEn}
                                onChange={(e) => setDescriptionTwoEn(e.target.value)}
                                maxLength="600"
                                cols="60"
                                className="textareaText"
                            />
                        </TabPanel>
                        <Box>

                            {
                                image ? (
                                    <div>
                                        <img src={image} alt="image" width={400} height={150}/>
                                        <Button color="secondary" variant="contained" component="label" style={{
                                            margin: "10px 0 30px 10px"
                                        }}>
                                            Edit Image
                                            <input type="file" hidden multiple onChange={handleFile}/>
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <Button color="secondary" variant="contained" component="label" style={{
                                            margin: "10px 0 30px 10px"
                                        }}>
                                            Edit Image
                                            <input type="file" hidden multiple onChange={handleFile}/>
                                        </Button>
                                    </div>
                                )
                            }
                        </Box>
                        <Box>
                            <Button onClick={handlerEdit} color="secondary" variant="contained">Edit</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default AddModal;
