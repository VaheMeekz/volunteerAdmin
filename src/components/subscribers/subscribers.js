import React from "react";
import {
    Box, TextField,

} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {getSubscribersThunk} from "../../store/actions/subscribersAction";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from "@mui/icons-material/Add";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Subscribers = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.subscribersReducer.subscribers);
    const [currentId, setCurrentId] = useState()
    const [editName, setEditName] = useState()
    const [editImage, setEditImage] = useState()
    const [newName, setNewName] = useState()
    const [newImage, setNewImage] = useState()
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        dispatch(getSubscribersThunk());
    }, []);

    const transport = (data) => {
        setEditName(data.namee)
        setEditImage(data.image)
        setCurrentId(data.id)
        handleOpen()
    }

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
                setEditImage(res.data.url);
            });
    };

    const handleFileNew = (e) => {
        let files = [];
        Object.keys(e.target.files).map((f) => {
            if (f === "Length") return;
            files.push(e.target.files[0]);
        });
        uploadImageNew(files);
    };

    const uploadImageNew = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "armcodingImage");
        formData.append("cloud_name", "armcoding");
        axios
            .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
            .then((res) => {
                setNewImage(res.data.url);
            });
    };

    const handlerEdit = () => {
        axios
            .post(`${baseUrl}/partner/edit`, {
                id: currentId,
                name: editName,
                image: editImage
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Success", showConfirmButton: false, timer: 1500,
                    });
                    handleClose()
                    setEditName("")
                    setEditImage("")
                    setCurrentId("")
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handlerDelete = (id) => {
        axios
            .post(`${baseUrl}/partner/delete`, {
                id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Success", showConfirmButton: false, timer: 1500,
                    });
                    handleClose()
                    setCurrentId("")
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleAdd = () => {
        axios
            .post(`${baseUrl}/partner`, {
                namee: newName,
                image: newImage
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Success", showConfirmButton: false, timer: 1500,
                    });
                    setOpenAdd(false)
                    setCurrentId("")
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
        <Box m={3} className="boxHeigth">
            <h2 mt={3} mb={3}>
                Partners
            </h2>
            <Box m={2}>
                <Button color="secondary" variant="contained" onClick={() => setOpenAdd(true)}>
                    <AddIcon/>
                </Button>
            </Box>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">#</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="left">Edit</TableCell>
                                <TableCell align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map((row, index) => (
                                <TableRow
                                    key={row.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="left">{index + 1}</TableCell>
                                    <TableCell align="left">{row.namee}</TableCell>
                                    <TableCell align="left">
                                        <img src={row.image} alt="logo" width={100} height={100}/>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button color="secondary" variant="outlined" onClick={() => transport(row)}
                                                autoFocus>
                                            <EditIcon/>
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button color="secondary" variant="outlined"
                                                onClick={() => handlerDelete(row.id)} autoFocus>
                                            <DeleteIcon/>
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
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
                    <Box style={{
                        margin: "20px 0"
                    }}>
                        <TextField variant="outlined" value={editName} onChange={e => setEditName(e.target.value)}/>
                    </Box>
                    <Box style={{
                        margin: "20px 0"
                    }}>
                        {
                            editImage && (
                                <div>
                                    <img src={editImage} alt="image" width={200} height={100}/>
                                    <Button color="secondary" variant="contained" component="label">
                                        Edit Image
                                        <input type="file" hidden multiple onChange={handleFile}/>
                                    </Button>
                                </div>
                            )
                        }
                    </Box>
                    <Box style={{
                        margin: "20px 0"
                    }}>
                        <Button color="secondary" variant="contained" onClick={handlerEdit}>Edit</Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add
                    </Typography>
                    <Box style={{
                        margin: "20px 0"
                    }}>
                        <TextField variant="outlined" value={newName} onChange={e => setNewName(e.target.value)}/>
                    </Box>
                    <Box style={{
                        margin: "20px 0"
                    }}>

                        <Button color="secondary" variant="contained" component="label">
                            Add Image
                            <input type="file" hidden multiple onChange={handleFileNew}/>
                        </Button>

                    </Box>
                    <Box style={{
                        margin: "20px 0"
                    }}>
                        {
                            newImage && (
                                <div>
                                    <img src={newImage} alt="image" width={200} height={100}/>
                                    <Button color="secondary" variant="contained" component="label">
                                        Edit Image
                                        <input type="file" hidden multiple onChange={handleFileNew}/>
                                    </Button>
                                </div>
                            )
                        }
                    </Box>
                    <Box style={{
                        margin: "20px 0"
                    }}>
                        <Button color="secondary" variant="contained" onClick={handleAdd}>Add</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default Subscribers;
