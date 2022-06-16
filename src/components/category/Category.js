import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryThunk} from "../../store/actions/categoryAction";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../aboutUs/aboutUs.scss";
import axios from "axios";
import Swal from "sweetalert2";
import {baseUrl, token} from "../../config/config";
import {TextField} from "@mui/material";
import CategoryAddModal from "./CategoryAddModal";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {makeArray} from "../../helpers/makeArray";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: 500,
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow:"scroll"
};

const Category = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.categoryReducer.category);
    const count = useSelector((state) => state?.categoryReducer.count);
    const [categorys, setCategorys] = useState();
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const limit = 5;
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState([]);
    const handleClose = () => setOpen(false);
    const handleCloseDelete = () => setOpenDelete(false);
    const handleCloseAdd = () => setOpenAdd(false);
    const [nameEditHy, setNameEditHy] = useState("");
    const [nameEditEn, setNameEditEn] = useState("");
    const [descHy, setDescHy] = useState("")
    const [descEn, setDescEn] = useState("")
    const [month, setMonth] = useState("")
    const [day, setDay] = useState("")
    const [search, setSearch] = useState()
    useEffect(() => {
        dispatch(getCategoryThunk(page, limit, search));
    }, [page, limit, search]);

    useEffect(() => {
        if (count) {
            setPages(makeArray(Math.ceil(count / limit)));
        }
    }, [count, limit]);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }, 100)
    }, [page]);

    useEffect(() => {
        setCategorys(data);
    }, [data]);


    const handelDelete = () => {
        axios
            .post(`${baseUrl}/work/delete`, {
                id: currentId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    setOpenDelete(false);
                    Swal.fire({
                        position: "center", icon: "success", title: "Succses", showConfirmButton: false, timer: 1500,
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

    const handleEdit = () => {
        axios
            .post(`${baseUrl}/work/edit`, {
                id: currentId,
                titleHy: nameEditHy,
                titleEn: nameEditEn,
                descriptionHy: descHy,
                descriptionEn: descEn,
                month,
                day
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    setOpen(false);
                    Swal.fire({
                        position: "center", icon: "success", title: "Succses", showConfirmButton: false, timer: 1500,
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
    return (<Box m={3} className="boxHeigth">
        <h2 mt={3} mb={3}>
            Work
        </h2>
        <hr/>
        <Box style={{margin: "10px"}}>
            <h4>Search</h4>
            <TextField placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
        </Box>
        <hr/>
        <Box m={2}>
            <Button color="secondary" variant="contained" onClick={() => setOpenAdd(true)}>
                Add
            </Button>
        </Box>
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Title Hy</TableCell>
                            <TableCell align="left">Title En</TableCell>
                            <TableCell align="left">Description Hy</TableCell>
                            <TableCell align="left">Description En</TableCell>
                            <TableCell align="left">Month</TableCell>
                            <TableCell align="left">Day</TableCell>
                            <TableCell align="left">Edit</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorys && categorys.map((row) => (<TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.titleHy}
                            </TableCell>
                            <TableCell align="left">{row.titleEn}</TableCell>
                            <TableCell align="left">{row.descriptionHy}</TableCell>
                            <TableCell align="left">{row.descriptionEn}</TableCell>
                            <TableCell align="left">{row.month}</TableCell>
                            <TableCell align="left">{row.day}</TableCell>
                            <TableCell align="left"> <Button color="secondary"
                                                             variant="contained"
                                                             onClick={() => {
                                                                 setCurrentId(row.id);
                                                                 setOpen(true);
                                                                 setNameEditHy(row.titleHy);
                                                                 setNameEditEn(row.titleEn);
                                                                 setDescHy(row.descriptionHy);
                                                                 setDescEn(row.descriptionEn);
                                                                 setMonth(row.month);
                                                                 setDay(row.day);
                                                             }}
                            >
                                Edit
                            </Button></TableCell>
                            <TableCell align="left"><Button color="secondary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setOpenDelete(true);
                                                                setCurrentId(row.id);
                                                            }}
                            >
                                Delete
                            </Button></TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
                {search && search.length ? null : (<div className="pagBox">
                        <div className="arrowBack">
                            {pages.length - 1 == page ? (<ArrowBackIcon
                                onClick={() => {
                                    setPage(page - 1);
                                }}
                            />) : null}
                        </div>
                        {pages.length > 1 && pages.map((s) => {
                            return (<div
                                className={page === s ? "ActivePagItem" : "pagItem"}
                                key={s}
                                onClick={() => {
                                    setPage(s);
                                }}
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                {s + 1}
                            </div>);
                        })}
                        <div className="arrowBack">
                            {pages.length - 1 == page ? null : (<ArrowForwardIcon
                                onClick={() => {
                                    setPage(page + 1);
                                }}
                            />)}
                        </div>
                    </div>)}
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h3>Edit</h3>
                        <TextField
                            id="filled-basic"
                            label="Hy"
                            variant="filled"
                            className="addInp"
                            value={nameEditHy}
                            onChange={(e) => setNameEditHy(e.target.value)}
                        />
                        <TextField
                            id="filled-basic"
                            label="En"
                            variant="filled"
                            className="addInp"
                            value={nameEditEn}
                            onChange={(e) => setNameEditEn(e.target.value)}
                        />
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="4"
                            maxLength="400"
                            cols="50"
                            className="textareaText"
                            value={descHy}
                            onChange={(e) => setDescHy(e.target.value)}
                        />
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="4"
                            maxLength="400"
                            cols="50"
                            className="textareaText"
                            value={descEn}
                            onChange={(e) => setDescEn(e.target.value)}
                        />
                        <TextField
                            id="filled-basic"
                            label="En"
                            variant="filled"
                            className="addInp"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        />
                        <TextField
                            id="filled-basic"
                            label="En"
                            variant="filled"
                            className="addInp"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                        />

                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <Button color="secondary" variant="contained" onClick={handleEdit}>Submit</Button>
                    </Typography>
                </Box>
            </Modal>

            <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete ?
                    </Typography>
                    <Typography
                        className="btnsBox"
                        id="modal-modal-description"
                        sx={{mt: 2}}
                    >
                        <div>
                            <Button color="secondary" variant="contained" onClick={handleCloseDelete}>
                                No
                            </Button>
                        </div>
                        <div>
                            <Button color="secondary" variant="contained" onClick={handelDelete}>
                                Yes
                            </Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <CategoryAddModal openAdd={openAdd} handleCloseAdd={handleCloseAdd} style={style}
                              setOpenAdd={setOpenAdd} setCategorys={setCategorys}
            />
        </Box>
    </Box>);
};

export default Category;
