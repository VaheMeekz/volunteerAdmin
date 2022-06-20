import React, {useState, useEffect} from 'react';
import {Box, Button, TextField} from "@mui/material";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import {getFileAC} from "../../store/actions/fileAction";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {baseUrl, staticUrl, token} from "../../config/config";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Swal from "sweetalert2";

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

const Files = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.fileReducer.file)
    const loading = useSelector(state => state.fileReducer.loading)
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState("")
    const [forms, setForms] = useState({
        name: "", nameHy: "", nameEn: ""
    })
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getFileAC())
    }, [])


    const handleDelete = (name, id) => {
        axios
            .post(`${baseUrl}/upload/delete`, {
                name: name,
                id: id
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
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(`${baseUrl}/upload`, {
                ...forms, file
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Succsess!", showConfirmButton: false, timer: 1500,
                    });
                    // setTimeout(() => {
                    //     window.location.reload(false);
                    // }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (<Box m={3} className="boxHeigth">
        <h2 mt={3} mb={3}>Delivery Settings</h2>
        <Box>
            <Button color="secondary" variant="contained" onClick={handleOpen}>Add</Button>
        </Box>
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">File name</TableCell>
                            <TableCell align="left">Name Hy</TableCell>
                            <TableCell align="left">Name En</TableCell>
                            <TableCell align="left">File</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && data.map((row, index) => (<TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left">{row.fileName}</TableCell>
                            <TableCell align="left">{row.nameHy}</TableCell>
                            <TableCell align="left">{row.nameEn}</TableCell>
                            <TableCell align="left">
                                <Button color="secondary" variant="outlined">
                                    <a href={`${staticUrl}/${row.fileName}`} target="_blank"><PictureAsPdfIcon/></a>
                                </Button>
                            </TableCell>
                            <TableCell align="left">
                                <Button color="secondary" variant="outlined"
                                        onClick={() => handleDelete(row.fileName, row.id)}>
                                    <DeleteIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        {/*modals*/}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add new file
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>

                    <form method="POST" enctype="multipart/form-data" action={`${baseUrl}/upload`}>
                        <label>File name</label>
                        <br/>
                        <TextField
                            name='name'
                            type='text'
                            variant="outlined"
                        />
                        <br/>
                        <label>Name Hy</label>
                        <br/>
                        <TextField
                            name='nameHy'
                            type='text'
                            variant="outlined"
                        />
                        <br/>
                        <label>Name En</label>
                        <br/>
                        <TextField
                            name='nameEn'
                            type='text'
                            variant="outlined"
                        />
                        <Box style={{
                            margin: "10px 0"
                        }}>
                            <label>Upload PDF</label>
                            <br/>
                            <TextField
                                name='file'
                                type='file'
                                variant="outlined"
                            />
                        </Box>
                        <Box style={{
                            margin: "10px 0"
                        }}>
                            <TextField
                                className='submitButton'
                                type='submit'
                                value='Add'
                            />
                        </Box>
                    </form>
                </Typography>
            </Box>
        </Modal>
    </Box>);
};

export default Files;