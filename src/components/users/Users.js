import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getCountriesThunk} from "../../store/actions/usersAction";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import "./users.scss";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from "@mui/icons-material/Add";
import AddModal from "./addModal";

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


const Users = () => {
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    const data = useSelector((state) => state?.usersReducer.users);
    const [open, setOpen] = React.useState(false);
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
    const [openAdd,setOpenAdd] = useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getCountriesThunk());
    }, []);


    const handleDeleteUser = (id) => {
        axios
            .post(`${baseUrl}/project/delete`, {
                id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
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
    };

    const transport = (row) => {
        setCurrentId(row.id)
        setTitleOneHy(row.titleOneHy)
        setTitleOneEn(row.titleOneEn)
        setDescriptionOneHy(row.descriptionOneHy)
        setDescriptionOneEn(row.descriptionOneEn)
        setImage(row.image)
        setTitleTwoHy(row.titleTwoHy)
        setTitleTwoEn(row.titleTwoEn)
        setDescriptionTwoHy(row.descriptionTwoHy)
        setDescriptionTwoEn(row.descriptionTwoEn)
        setOpen(true)
    }

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
            .post(`${baseUrl}/project/edit`, {
                id: currentId,
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
    return (<Box m={3} className="boxHeigth">
        <h2 mt={3} mb={3}>
            Projects
        </h2>
        <Box m={2}>
            <Button color="secondary" variant="contained" onClick={() => setOpenAdd(true)}>
                <AddIcon/>
            </Button>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <strong>#</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Image</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Title Hy</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Title En</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Description Hy</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Description En</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Title Two Hy</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Title Two En</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Description Two Hy</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Description Two En</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Edit</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Delete</strong>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data !== null && data.map((row, index) => (<TableRow
                        key={row.id}
                        sx={{"&:last-child td, &:last-child th": {border: 0}}}
                    >
                        <TableCell component="th" scope="row">
                            {index + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                           <img src={row.image} alt="image" width={100} height={80}/>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.titleOneHy}
                        </TableCell>
                        <TableCell align="left">{row.titleOneEn}</TableCell>
                        <TableCell align="left">{row.descriptionOneHy}</TableCell>
                        <TableCell align="left">{row.descriptionOneEn}</TableCell>
                        <TableCell align="left">{row.titleTwoHy}</TableCell>
                        <TableCell align="left">{row.titleTwoEn}</TableCell>
                        <TableCell align="left">{row.descriptionTwoHy}</TableCell>
                        <TableCell align="left">{row.descriptionTwoEn}</TableCell>
                        <TableCell align="left">
                            <Button color="secondary" variant="outlined" onClick={() => transport(row)}
                                    autoFocus>
                                <EditIcon/>
                            </Button>
                        </TableCell>
                        <TableCell align="left" className="delBtn">
                            <Button variant="outlined" onClick={() => {
                                handleDeleteUser(row.id)
                            }} color="secondary" autoFocus>
                                <DeleteIcon className="iconsPreferances"/>
                            </Button>
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
        <Modal
            open={open}
            onClose={handleClose}
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
                            defaultValue={data?.length == 0 ? null : data?.textHy}
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
                            defaultValue={data?.length == 0 ? null : data?.textHy}
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
                            defaultValue={data?.length == 0 ? null : data?.textHy}
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
                            defaultValue={data?.length == 0 ? null : data?.textHy}
                            className="textareaText"
                        />
                    </TabPanel>
                    <Box>
                        {
                            image && (
                                <div>
                                    <img src={image} alt="image" width={400} height={150}/>
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
        {
            openAdd &&  <AddModal openAdd={openAdd} setOpenAdd={setOpenAdd}/>
        }

    </Box>);
};

export default Users;
