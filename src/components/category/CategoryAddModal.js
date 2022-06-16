import React, {useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

const CategoryAddModal = ({openAdd, handleCloseAdd, style, setOpenAdd, setCategorys}) => {
    const [titleHy, setTitleHy] = useState("")
    const [titleEn, setTitleEn] = useState("")
    const [descHy, setDescHy] = useState("")
    const [descEn, setDescEn] = useState("")
    const [month, setMonth] = useState("")
    const [day, setDay] = useState("")
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // xoracum gov start
    const [gov, setGov] = useState([{id: Math.random(), descriptionHy: "", descriptionEn: ""},]);
    const handleSubmitGov = e => {
        e.preventDefault()
    }
    const handleChangeInputGov = (id, event) => {
        const newInputFieldsHy = gov.map((i) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value;
            }
            return i;
        });
        setGov(newInputFieldsHy.filter((i) => i.descriptionHy !== ""));
    };
    const handleAddFieldsGov = () => {
        setGov([...gov, {id: Math.random(), descriptionHy: "", descriptionEn: ""},]);
    };
    const handleRemoveFieldsGov = (id) => {
        const values = [...gov];
        values.splice(values.findIndex((value) => value.id === id));
        setGov(values);
    };
    // xoracum gov end
    //xoracum win start
    const [win, setWin] = useState([{id: Math.random(), descriptionHy: "", descriptionEn: ""},]);
    const handleSubmitWin = e => {
        e.preventDefault()
    }
    const handleChangeInputWin = (id, event) => {
        const newInputFieldsHy = win.map((i) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value;
            }
            return i;
        });
        setWin(newInputFieldsHy.filter((i) => i.descriptionHy !== ""));
    };
    const handleAddFieldsWin = () => {
        setWin([...win, {id: Math.random(), descriptionHy: "", descriptionEn: ""},]);
    };
    const handleRemoveFieldsWin = (id) => {
        const values = [...win];
        values.splice(values.findIndex((value) => value.id === id));
        setWin(values);
    };
    //xoracum win end
    //xoracum plus start
    const [plus, setPlus] = useState([{id: Math.random(), descriptionHy: "", descriptionEn: ""},]);
    const handleSubmitPlus = e => {
        e.preventDefault()
    }
    const handleChangeInputPlus = (id, event) => {

        const newInputFieldsHy = plus.map((i) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value;
            }
            return i;
        });
        setPlus(newInputFieldsHy.filter((i) => i.descriptionHy !== ""));
    };
    const handleAddFieldsPlus = () => {
        setPlus([...plus, {id: Math.random(), descriptionHy: "", descriptionEn: ""},]);
    };
    const handleRemoveFieldsPlus = (id) => {
        const values = [...plus];
        values.splice(values.findIndex((value) => value.id === id));
        setPlus(values);
    };
    //xoracum plus end
    const handleAdd = () => {
        axios
            .post(
                `${baseUrl}/work`,
                {
                    titleHy, titleEn,
                    descriptionHy: descHy,
                    descriptionEn: descEn,
                    month, day,
                    plus, gov, win
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(function (response) {
                if (!response.data.error) {
                    setOpenAdd(false);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Succses",
                        showConfirmButton: false,
                        timer: 1500,
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
    return (
        <Modal
            open={openAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Hy" {...a11yProps(0)} />
                                <Tab label="En" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <h3>Title</h3>
                            <TextField label="title" variant="outlined" value={titleHy}
                                       onChange={e => setTitleHy(e.target.value)}/>
                            <h3>Description</h3>
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
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <h3>Title</h3>
                            <TextField label="title" variant="outlined" value={titleEn}
                                       onChange={e => setTitleEn(e.target.value)}/>
                            <h3>Description</h3>
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
                        </TabPanel>
                        <h3>Month</h3>
                        <TextField label="title" variant="outlined" value={month}
                                   onChange={e => setMonth(e.target.value)}/>
                        <h3>Day</h3>
                        <TextField label="title" variant="outlined" value={day} onChange={e => setDay(e.target.value)}/>
                        <Box>
                            <h3>Government</h3>
                            <form onSubmit={handleSubmitGov}>
                                {gov.map((inputField, index) => (<div key={inputField.id}>
                                    <textarea
                                        name="descriptionHy"
                                        rows="4"
                                        maxLength="400"
                                        cols="50"
                                        className="textareaText"
                                        value={inputField.descriptionHy}
                                        onChange={(event) => {
                                            if (event.target.name !== "") {
                                                handleChangeInputGov(inputField.id, event);
                                            }
                                        }}
                                    />
                                    <br/>
                                    <textarea
                                        name="descriptionEn"
                                        rows="4"
                                        maxLength="400"
                                        cols="50"
                                        className="textareaText"
                                        value={inputField.descriptionEn}
                                        onChange={(event) => {
                                            if (event.target.descriptionEn !== "") {
                                                handleChangeInputGov(inputField.id, event);
                                            }
                                        }}
                                    />
                                    <div className="xorBtns">
                                        <Button
                                            disabled={index === 0 && true}
                                            onClick={() => handleRemoveFieldsGov(inputField.id)}
                                            variant="outlined"
                                            color="error"
                                        >
                                            <i className="fa-solid fa-minus">Delete</i>
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddFieldsGov();
                                            }}
                                            variant="outlined"
                                            color="secondary"
                                        >
                                            <i className="fa-solid fa-plus">Add</i>
                                        </Button>
                                    </div>
                                    <hr className="hr"/>
                                </div>))}
                            </form>
                        </Box>
                        <Box>
                            <h3>Win</h3>
                            <form onSubmit={handleSubmitWin}>
                                {win.map((inputField, index) => (<div key={inputField.id}>
                                    <textarea
                                        name="descriptionHy"
                                        rows="4"
                                        maxLength="400"
                                        cols="50"
                                        className="textareaText"
                                        value={inputField.descriptionHy}
                                        onChange={(event) => {
                                            if (event.target.name !== "") {
                                                handleChangeInputWin(inputField.id, event);
                                            }
                                        }}
                                    />
                                    <br/>
                                    <textarea
                                        name="descriptionEn"
                                        rows="4"
                                        maxLength="400"
                                        cols="50"
                                        className="textareaText"
                                        value={inputField.descriptionEn}
                                        onChange={(event) => {
                                            if (event.target.descriptionEn !== "") {
                                                handleChangeInputWin(inputField.id, event);
                                            }
                                        }}
                                    />
                                    <div className="xorBtns">
                                        <Button
                                            disabled={index === 0 && true}
                                            onClick={() => handleRemoveFieldsWin(inputField.id)}
                                            variant="outlined"
                                            color="error"
                                        >
                                            <i className="fa-solid fa-minus">Delete</i>
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddFieldsWin();
                                            }}
                                            variant="outlined"
                                            color="secondary"
                                        >
                                            <i className="fa-solid fa-plus">Add</i>
                                        </Button>
                                    </div>
                                    <hr className="hr"/>
                                </div>))}
                            </form>
                        </Box>
                        <Box>
                            <h3>Plus</h3>
                            <form onSubmit={handleSubmitPlus}>
                                {plus.map((inputField, index) => (<div key={inputField.id}>
                                    <textarea
                                        name="descriptionHy"
                                        rows="4"
                                        maxLength="400"
                                        cols="50"
                                        className="textareaText"
                                        value={inputField.descriptionHy}
                                        onChange={(event) => {
                                            if (event.target.name !== "") {
                                                handleChangeInputPlus(inputField.id, event);
                                            }
                                        }}
                                    />
                                    <br/>
                                    <textarea
                                        name="descriptionEn"
                                        rows="4"
                                        maxLength="400"
                                        cols="50"
                                        className="textareaText"
                                        value={inputField.descriptionEn}
                                        onChange={(event) => {
                                            if (event.target.descriptionEn !== "") {
                                                handleChangeInputPlus(inputField.id, event);
                                            }
                                        }}
                                    />
                                    <div className="xorBtns">
                                        <Button
                                            disabled={index === 0 && true}
                                            onClick={() => handleRemoveFieldsPlus(inputField.id)}
                                            variant="outlined"
                                            color="error"
                                        >
                                            <i className="fa-solid fa-minus">Delete</i>
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddFieldsPlus();
                                            }}
                                            variant="outlined"
                                            color="secondary"
                                        >
                                            <i className="fa-solid fa-plus">Add</i>
                                        </Button>
                                    </div>
                                    <hr className="hr"/>
                                </div>))}
                            </form>
                        </Box>
                    </Box>
                </Typography>
                <Typography
                    className="btnsBox"
                    id="modal-modal-description"
                    sx={{mt: 2}}
                >
                    <Button color="secondary" onClick={handleCloseAdd}>Close</Button>
                    <Button color="secondary" variant="contained" onClick={handleAdd}>
                        Submit
                    </Button>
                </Typography>
            </Box>
        </Modal>
    );
};

export default CategoryAddModal;