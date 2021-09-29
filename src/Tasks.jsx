import React, {useState} from "react"
import { Button, Card, TextField, Grid, Typography } from "@mui/material"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import TaskCard from "./TaskCard"
import format from "date-fns/format"


const Tasks = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(null)
    const [errorMessage, setErrorMessage] = useState()

    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const [tasks, setTasks] = useState([])

    const handleConfirm = () => {
        if(title !== "" && description !== "" && date !== "null") {
            const taskData = {Title: title, Description: description, Date: format(date, "MM-dd-yyyy")}
            setTasks([...tasks, taskData])
            setTitle("")
            setDescription("")
            setDate(null)
            setErrorMessage()
            toggleMenu()
        }
        else {
            setErrorMessage("*All fields must be filled out!")
        }
    }

    const [selectedDay, setSelectedDay] = useState(new Date())
    return (
        <div>
            <Grid container spacing={4} justifyContent="center" style={{marginBottom: "20px"}}>
                <Grid item>
                    <Card variant="outlined">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                                openTo="day"
                                value={selectedDay}
                                onChange={(newDay) => {
                                    setSelectedDay(newDay);
                                }}
                                showToolbar={false}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Card>
                </Grid>
                <Grid item>
                    <div style={{width: "320px"}}>
                        <Button color="primary" variant="contained" onClick={toggleMenu} style={{textTransform: "none", fontWeight: "bold", color: "white"}}>{menuOpen ? "Cancel" : "Add Task"}</Button>
                        {menuOpen && 
                            <Card variant="outlined" style={{padding: "20px", margin: "20px 0px"}}>
                                <TextField 
                                    variant="outlined" 
                                    color="primary" 
                                    fullWidth 
                                    label="Title" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{marginBottom: "10px"}}
                                />

                                <TextField 
                                    variant="outlined" 
                                    color="primary" 
                                    fullWidth 
                                    label="Description" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    style={{marginBottom: "10px"}}
                                />

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                            label="Date"
                                            value={date}
                                            onChange={(newDate) => {
                                            setDate(newDate);
                                        }}
                                        renderInput={(params) => <TextField fullWidth {...params} style={{marginBottom: "10px"}} />}
                                    />
                                </LocalizationProvider>
                                <Typography style={{color: "red"}} variant="caption">{errorMessage}</Typography>
                                <div style={{marginLeft: "auto", textAlign: "right"}}>
                                    <Button color="primary" variant="outlined" onClick={handleConfirm} style={{textTransform: "none", fontWeight: "bold", marginTop: "4px"}}>
                                        Confirm
                                    </Button>
                                </div>
                            </Card>
                        }
                    </div>
                </Grid>
            </Grid>
            {tasks.map((task) => (
                <TaskCard Title={task.Title} Description={task.Description} Date={task.Date} />
            ))}
        </div>
    )
}

export default Tasks
