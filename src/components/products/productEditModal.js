import React, {useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import {Box, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 700,
    overflow: "scroll",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const childStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 300,
    overflow: "scroll",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
}

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
        id: `simple-tab-${index}`, "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ProductEditModal = ({openEdit, setOpenEdit, currentId, row}) => {
    //-------states
    const [nameHy, setNameHy] = useState();
    const [nameEn, setNameEn] = useState();
    const [descriptionHy, setDescripHy] = useState();
    const [descriptionEn, setDescripEn] = useState();
    const [subtitleHy,setSubtitleHy] = useState()
    const [subtitleEn,setSubtitleEn] = useState()
    const [subTextHy,setSubTextHy] = useState()
    const [subTextEn,setSubTextEn] = useState()
    const [secondSubTitleHy,setSecondSubTitleHy] = useState()
    const [secondSubTitleEn,setSecondSubTitleEn] = useState()
    const [secondSubTextHy,setSecondSubTextHy] = useState()
    const [secondSubTextEn,setSecondSubTextEn] = useState()
    const [image, setImage] = useState();
    const [value, setValue] = useState(0);
    //-------states end

    useEffect(() => {
        openEdit && setNameHy(row.titleHy);
        openEdit && setNameEn(row.titleEn);
        openEdit && setDescripHy(row.descriptionHy);
        openEdit && setDescripEn(row.descriptionEn);

        openEdit && setSubtitleHy(row.subtitleHy);
        openEdit && setSubtitleEn(row.subtitleEn);
        openEdit && setSubTextHy(row.subTextHy);
        openEdit && setSubTextEn(row.subTextEn);


        openEdit && setSecondSubTitleHy(row.secondSubTitleHy);
        openEdit && setSecondSubTitleEn(row.secondSubTitleEn);
        openEdit && setSecondSubTextHy(row.secondSubTextHy);
        openEdit && setSecondSubTextEn(row.secondSubTextEn);

        openEdit && setImage(row?.image);
    }, [row])

    const handleFileEdit = (e, index) => {
        let files = [];
        Object.keys(e.target.files).map((f) => {
            if (f === "Length") return;
            files.push(e.target.files[0]);
        });
        uploadImageEdit(files);
    };

    let arrOfImagesEdit = [];
    const uploadImageEdit = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "armcodingImage");
        formData.append("cloud_name", "armcoding");
        axios
            .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
            .then((res) => {
                arrOfImagesEdit.push(res.data.url);
                setImage(res.data.url)
            });

    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleEdit = () => {
        axios
            .post(`${baseUrl}/news/edit`, {
                id: currentId,
                image,
                titleHy:nameHy,
                titleEn:nameEn,
                descriptionHy,
                descriptionEn,
                subtitleHy,
                subtitleEn,
                subTextHy,
                subTextEn,
                secondSubTitleHy,
                secondSubTitleEn,
                secondSubTextHy,
                secondSubTextEn
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
                    setOpenEdit(false);
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div>
            <Modal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit
                    </Typography>
                    <Box sx={{width: "100%"}}>
                        <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                textColor="secondary"
                                indicatorColor="secondary"
                            >
                                <Tab label="Hy" {...a11yProps(0)} />
                                <Tab label="En" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <h4>Title</h4>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={nameHy}
                                onChange={(e) => setNameHy(e.target.value)}
                            />
                            <h4>Description</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                maxlength="400"
                                cols="50"
                                className="textareaText"
                                value={descriptionHy}
                                onChange={(e) => setDescripHy(e.target.value)}
                            />
                            <h4>Subtitle</h4>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={subtitleHy}
                                onChange={(e) => setSubtitleHy(e.target.value)}
                            />
                            <h4>Text</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                maxLength="400"
                                cols="50"
                                className="textareaText"
                                value={subTextHy}
                                onChange={(e) => setSubTextHy(e.target.value)}
                            />
                            <h4>Second Subtitle</h4>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={secondSubTitleHy}
                                onChange={(e) => setSecondSubTitleHy(e.target.value)}
                            />
                            <h4>Second Text</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                maxLength="400"
                                cols="50"
                                className="textareaText"
                                value={secondSubTextHy}
                                onChange={(e) => setSecondSubTextHy(e.target.value)}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <h4>Name</h4>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={nameEn}
                                onChange={(e) => setNameEn(e.target.value)}
                            />
                            <h4>Description</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                maxlength="400"
                                cols="50"
                                className="textareaText"
                                value={descriptionEn}
                                onChange={(e) => setDescripEn(e.target.value)}
                            />
                            <h4>Subtitle</h4>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={subtitleEn}
                                onChange={(e) => setSubtitleEn(e.target.value)}
                            />
                            <h4>Text</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                maxLength="400"
                                cols="50"
                                className="textareaText"
                                value={subTextEn}
                                onChange={(e) => setSubTextEn(e.target.value)}
                            />
                            <h4>Second Subtitle</h4>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={secondSubTitleEn}
                                onChange={(e) => setSecondSubTitleEn(e.target.value)}
                            />
                            <h4>Second Text</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                maxLength="400"
                                cols="50"
                                className="textareaText"
                                value={secondSubTextEn}
                                onChange={(e) => setSecondSubTextEn(e.target.value)}
                            />
                        </TabPanel>
                    </Box>
                    <Box style={{margin: "10px 0"}}>
                        <Button color="secondary" variant="contained" component="label">
                            Edit Image
                            <input type="file" hidden multiple onChange={handleFileEdit}/>
                        </Button>
                    </Box>
                    <Box>
                        <img src={image} alt="image" style={{width: "200px", height: "200px"}}/>
                    </Box>
                    <Box>
                        <Button color="secondary" variant="contained" onClick={handleEdit}>Edit</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}


function ChildModal({id}) {
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = useState(null)
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleFileEdit = (e, index) => {
        let files = [];
        Object.keys(e.target.files).map((f) => {
            if (f === "Length") return;
            files.push(e.target.files[0]);
        });
        uploadImageEdit(files);
    };

    let arrOfImagesEdit = [];
    const uploadImageEdit = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "armcodingImage");
        formData.append("cloud_name", "armcoding");
        axios
            .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
            .then((res) => {
                arrOfImagesEdit.push(res.data.url);
                setImage(res.data.url)
            });

    };

    return (
        <React.Fragment>
            <Button variant="contained"
                    color="secondary" onClick={handleOpen}>edit</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={childStyles}>
                    <h2 id="child-modal-title">Edit Image</h2>
                    <Button color="secondary" variant="contained" component="label">
                        Edit Image
                        <input type="file" hidden multiple onChange={handleFileEdit}/>
                    </Button>
                    {
                        image !== null && (
                            <div>
                                <img src={image} alt="image" style={{width: "150px", height: "150px"}}/>
                                {/*<Button color="secondary" variant="contained" onClick={addImage}>Add</Button>*/}
                            </div>
                        )
                    }
                    <Box style={{
                        marginTop: "50px"
                    }}>
                        <Button color="secondary" variant="contained" component="label" onClick={handleClose}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default ProductEditModal;