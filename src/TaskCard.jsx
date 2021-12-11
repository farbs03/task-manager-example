import React, {useState} from "react"

//imports to help with formatting and UI
import {Grid, Card, Typography, IconButton, Dialog, DialogContent, Box} from "@mui/material"
import { DeleteOutlined, Edit, DeleteForever } from "@mui/icons-material";

//animation library that allows elements to be animated
import {motion} from "framer-motion"

//date formatting/management libraries that deal allow date picker to function
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

//makes code a lot more readable by storing all the styling info that goes into some of the components
import classes from "./classes"

//Each task takes in necessary info to be stored/displayed, in addition to functions for deleting and editing
const TaskCard = ({Title, Description, Date, Tag, Priority, Completed, id, deleteTask, editTask}) => {

    //state management for delete and edit confirmation modals
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)

    //state management for updating task info in edit modal
    const [title, setTitle] = useState(Title)
    const [description, setDescription] = useState(Description)
    const [date, setDate] = useState(Date)
    const [tag, setTag] = useState(Tag)
    const [priority, setPriority] = useState(Priority)
    const [completed, setCompleted] = useState(Completed)

    //will be displayed if user tries to confirm edit after leaving a field blank
    const [errorMessage, setErrorMessage] = useState("")

    //deletes task and closes confirm delete modal
    const confirmDelete = () => {
        deleteTask(id)
        setDeleteConfirmOpen(false)
    }

    //makes sure all fields are filled out; makes new task object; edits the task; closes confirm edit modal
    const confirmEdit = () => {
        if(title !== "" && description !== "" && date !== "null" && tag !== "" && priority !== "") {
            const taskData = {Title: title, Description: description, Date: date, Tag: tag, Priority: priority, Completed: completed, id: id}
            editTask(taskData)
            setEditOpen(false)
        }
        else {
            //will display if a field isn't filled out
            setErrorMessage("*All fields must be filled out!")
        }
    }

    //state management for the completed variable, which is controlled by the checkbox
    //runs edit function, keeping all other info except completed the same 
    const toggleCompleted = () => {
        setCompleted(!completed)
        const taskData = {Title: title, Description: description, Date: date, Tag: tag, Priority: priority, Completed: !completed, id: id}
        editTask(taskData)
    }

    return (
        
        <motion.div
            initial={{opacity: 0, y: 2}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.2, delay: 0.2}}
        >

            {/* motion.div for animation, card to display task info */}

            <Card
                style={{margin: "10px auto", padding: "16px 24px", maxWidth: "650px", borderRadius: "12px"}}
            >
                
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>

                        {/* section for checkbox and title, handles logic for clicking checkbox */}

                        <div>
                            <label class="flex items-center space-x-3">
                                <input type="checkbox" class={classes.checkbox} checked={completed} onChange={toggleCompleted} />
                                <span style={{textDecoration: completed ? "line-through" : "none", fontWeight: "bold", opacity: completed ? "0.6" : "1", fontSize: "18px", lineHeight: "20px", marginLeft: "8px"}}>
                                    {Title}
                                </span>
                            </label>
                        </div>
                    </Grid>

                    {/* delete and edit buttons, handles logic for opening modals */}

                    <Grid item>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <IconButton style={{padding: "0px"}} onClick={() => setDeleteConfirmOpen(true)}><DeleteOutlined style={{width: "28px", height: "28px", color: "rgb(255 40 40)"}}/></IconButton>
                            <IconButton color="primary" style={{padding: "0px"}} onClick={() => setEditOpen(true)}><Edit style={{width: "28px", height: "28px"}}/></IconButton>
                        </div>
                    </Grid>
                </Grid>

                {/* tag and priority display */}

                <div class="flex mt-1">
                    <span class={classes.primaryBadge}>#{Tag}</span>
                    <span class={classes.darkBadge}>{Priority} priority</span>
                </div>

                {/* description */}

                <p class="text-base text-gray-300">{Description}</p>
            </Card>

            {/* delete confirm modal, will open when delete button is pressed */}

            <Dialog color="inherit" open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} style={{textAlign: "center"}}>
                <DialogContent style={{justifyContent: "center", padding: "0px"}}>
                    <Card style={{padding: "18px", maxWidth: "250px"}}>
                        <Typography><DeleteForever style={{fontSize: "40px", marginBottom: "5px"}} /></Typography>
                        <Typography variant="h6" style={{marginBottom: "10px"}}>Do you want to delete this task?</Typography>
                        <button 
                            type="button" 
                            class={classes.confirmButton}
                            onClick={confirmDelete}
                        >
                            Yes
                        </button>
                        <button 
                            type="button" 
                            class={classes.cancelButton}
                            onClick={() => setDeleteConfirmOpen(false)}
                        >
                            No
                        </button>
                    </Card>
                </DialogContent>
            </Dialog>

            {
            /* 
                edit confirm modal; will open when edit button is pressed
                holds exact same fields that you see when you click 'New Task +', except all fields are initialized to the original values of the task
                allows user to update any values for the task they want to change
                changes are saved once 'Confirm' button is clicked 
            */
            }

            <Dialog color="inherit" open={editOpen} onClose={() => setEditOpen(false)}>
                <Card style={{padding: "18px"}}>

                    <Typography variant="h6" style={{marginBottom: "10px"}}>Edit task</Typography>
                    
                    {/* enter title */}

                    <div class="relative mb-4">
                        <input 
                            type="text" 
                            class={classes.textfield}
                            placeholder="Title"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* enter description */}

                    <div class="relative mb-4">
                        <input 
                            type="text" 
                            class={classes.textfield}
                            placeholder="Description"
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* choose date */}

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            value={date}
                            onChange={(newDate) => {
                                setDate(newDate);
                            }}
                            views={['day']}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: "15px" }}>
                                    <div class="relative">
                                        <input
                                            ref={inputRef} 
                                            {...inputProps}
                                            class={classes.textfield}
                                        />
                                    </div>
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
                    
                    {/* enter tag */}

                    <div class="relative flex w-full flex-wrap items-stretch mb-4">
                        <span
                            class={classes.textfieldIcon}
                        >
                            <i class="fas fa-hashtag"></i>
                        </span>
                        <input
                            type="text"
                            placeholder="Tag"
                            class={classes.textfieldWithIcon}
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                    </div>
                    
                    {/* buttons that allow user to choose task priority */}

                    <p class="text-center mb-1" style={{fontWeight: "bold", fontSize: "14px"}}>Priority</p>
                    <div class="relative mb-4 flex justify-center space-items">
                        {['High', 'Medium', 'Low'].map((value) => (
                            <>
                                {value !== priority ? 
                                    <button onClick={() => setPriority(value)} class={classes.unselectedPriorityButton}>{value}</button>
                                    :
                                    <button onClick={() => setPriority(value)} class={classes.selectedPriorityButton}>{value}</button>
                                }
                                
                            
                            </>
                        ))}
                    </div>
                    
                    {/* error message pops up if all fields aren't filled out */}
                    <p style={{color: "red", fontSize: "12px"}}>{errorMessage}</p>
                    
                    {/* confirm or cancel task creation */}

                    <div style={{display: "flex"}}>

                        <motion.button
                            whileTap={{scale: 0.98}}
                        >
                            <button 
                                type="button" 
                                class={classes.confirmButton}
                                onClick={confirmEdit}
                            >
                                Confirm
                            </button>
                        </motion.button>

                        <motion.button
                            whileTap={{scale: 0.98}}
                        >
                            <button 
                                type="button" 
                                class={classes.cancelButton}
                                onClick={() => setEditOpen(false)}
                            >
                                Cancel
                            </button>
                        </motion.button>

                    </div>
                </Card>
            </Dialog>
            
        </motion.div>
    )
}

export default TaskCard;
