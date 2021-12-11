import React, {useEffect, useState} from "react"

//imports for styling and layout
import { Card, TextField, Grid, Typography, Box } from "@mui/material"

//libraries for calendar/date picker to work
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

//displayed when user is creating a task and selects a date
import DatePicker from '@mui/lab/DatePicker';

//displayed on the next to new task button
import StaticDatePicker from '@mui/lab/StaticDatePicker';

//import TaskCard so that all datapoints can be mapped onto their own card
import TaskCard from "./TaskCard"

//date formatting library (for display)
import format from "date-fns/format"

//generates a unique id for each task, allows for edit and delete functionality
import {uuid} from "uuidv4"

//animation library
import { motion } from "framer-motion";

//calendar icon
import {Event} from "@mui/icons-material"

//makes code a lot more readable by storing all the styling info that goes into some of the components
import classes from "./classes"

const Tasks = () => {

    //state management for info when user is creating a task
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(null)
    const [tag, setTag] = useState("")
    const [priority, setPriority] = useState("")

    //displayed if user doesn't fill out all fields when creating a task
    const [errorMessage, setErrorMessage] = useState("")

    //filter options can be 'None', or user can filter by tag or priority 
    const [filterOption, setFilterOption] = useState("None")

    //if user wants to filter by tag, this variable stores whatever they type
    const [searchTag, setSearchTag] = useState("")

    //if user wants to filter by priority, this manages what priority they have chosen to filter by
    const [priorityFilter, setPriorityFilter] = useState("")

    //determines if the add task section under the 'New Task +' button should be visible or not
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    //state management for all tasks
    const [tasks, setTasks] = useState([])
    //tasks are stored in local storage, this essentially allows me to update the state variable after fetching local storage
    //because local storage maintains its value after refreshing and state doesn't, this is necessary to check every time
    const currTasks = JSON.parse(localStorage.getItem("tasks"))

    /*
        implements logic explained above; every time the page re-renders, it will check if the local storage holds any tasks
        if there aren't any tasks in local storage, set the state variable for tasks to an empty array
        if there are, store them in the tasks state variable
    */
    useEffect(() => {
        if(currTasks === null) {
            setTasks([])
        }
        else {
            setTasks(currTasks)
        }
        console.log(tasks)
    }, [])

    const addTask = () => {
        //ensures all fields are filled out
        if(title !== "" && description !== "" && date !== "null" && tag !== "" && priority !== "") {
            //creates unique id for task
            const id = uuid();
            //creates object for task
            const taskData = {Title: title, Description: description, Date: format(date, "MM-dd-yyyy"), Tag: tag, Priority: priority, Completed: false, id: id}

            //updates tasks state variable and local storage
            //this is necessary because rendering dynamic data from local storage doesn't work, but for state variables, it does
            //however, if the page refreshes, the state variable will be reset but local storage won't
            //this is why the useEffect is there to ensure that the state variable is initialized to whatever is in local storage
            setTasks([...tasks, taskData])
            localStorage.setItem("tasks", JSON.stringify([...tasks, taskData]))

            //resets prompts for next time user creates task
            setTitle("")
            setDescription("")
            setDate(null)
            setTag("")
            setPriority("")

            //ensures error message gets reset, toggles menu (it will close since it was open in the first place)
            setErrorMessage("")
            toggleMenu()
        }
        else {
            //sets error message to this is fields aren't filled out, will be displayed
            setErrorMessage("*All fields must be filled out!")
        }
    }

    //delete task function that gets passed into each TaskCard component
    const deleteTask = (id) => {
        //creates a new array of tasks, excluding the one that you're deleting
        const newTasks = tasks.filter((task) => task.id !== id);
        //updates state and local storage for aforementioned reasons, passing in the new array
        setTasks(newTasks)
        localStorage.setItem('tasks', JSON.stringify(newTasks))
    }

    //edit task function that gets passed to each TaskCard component
    const editTask = (taskData) => {
        //gets current local storage
        var data = JSON.parse(localStorage.getItem("tasks"))
        //loops through until the task to be edited is reached, updates the 'data' array at that point by replacing it with the taskData parameter (the new task object that replaces the old one)
        for(var i = 0; i < data.length; i++) {
            if(taskData.id === data[i].id) {
                data[i] = taskData
                break
            }
        }
        //updates state and local storage for aforementioned reasons
        setTasks(data)
        localStorage.setItem("tasks", JSON.stringify(data))
    }

    //state management for the calendar next to the new task button, allows user to select different days to filter tasks by date
    const [selectedDay, setSelectedDay] = useState(new Date())
    
    //state management for the tasks only on the selected calendar date
    const [todaysTasks, setTodaysTasks] = useState([])

    //state management that holds tasks after user selects tag or priority filter
    const [filteredTasks, setFilteredTasks] = useState([])

    //every time user selects new calendar date, this ensures that the tasks for the day they selected will be displayed
    useEffect(() => {
        //format date
        const formatted = format(selectedDay, "MM-dd-yyyy")
        const newTasks = []
        //adds tasks if they are on the selected date
        for(var i = 0; i < tasks.length; i++) {
            if(tasks[i].Date === formatted) {
                newTasks.push(tasks[i])
            }
        }
        //updates todays tasks
        setTodaysTasks(newTasks)
        //updates filtered tasks to the same value, which in essence resets any filters that were previously applied because a new day was selected
        setFilteredTasks(newTasks)

        //this useEffect is dependent on the selectedDay and tasks state variables
    }, [selectedDay, tasks])

    //this runs any time the user changes what they want to filter by
    //in essence, it resents any previous filters that were applied by setting filteredTasks to todaysTasks
    //it also resets any values the user inputted for other filters
    useEffect(() => {
        setFilteredTasks(todaysTasks)
        if(filterOption === "None") {
            setSearchTag("")
            setPriorityFilter("")
        }
        if(filterOption === "Tag") {
            setPriorityFilter("")
        }
        if(filterOption === "Priority") {
            setSearchTag("")
        }
    }, [filterOption])

    //function to filter tasks, takes priorityValue in as a parameter (only used when user filters by priority)
    const filterTasks = (priorityValue) => {
        var temp = []
        if(filterOption === "Tag") {
            if(searchTag !== "") {
                //adds any tasks from todaysTasks whose tag equals the tag that the user searched
                todaysTasks.forEach((task) => {
                    if(task.Tag === searchTag) {
                        temp.push(task)
                    }
                })
            }
            else {
                //if user didn't type anything but still clicks the search button, it will just set the array to todaysTasks (essentially resetting the filter)
                temp = todaysTasks
            }
        }
        else if(filterOption === "Priority") {
            //sets the priority filter value to whatever the user selected
            setPriorityFilter(priorityValue)
            //makes sure the user selected something
            if(priorityValue !== "") {
                //same process as with the tag filter, except now it's if any task from todaysTasks has the same priority as the priorityValue parameter
                todaysTasks.forEach((task) => {
                    if(task.Priority === priorityValue) {
                        temp.push(task)
                    }
                })
            }
            else {
                temp = todaysTasks
            }
        }
        //ensures temp is set to todaysTasks if no filter option is chosen
        else {
            temp = todaysTasks
        }
        //sets the filtered tasks to the temp array
        setFilteredTasks(temp)
    }

    return (
        <div>

            {/* icon import from font awesome */}

            <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
            />

            {/* holds the calendar and button/menu for creating tasks, formats them nicely next to each other with the Grid components */}
            
            <Grid container spacing={2} justifyContent="center" style={{marginBottom: "20px"}}>

                {/* Calendar, allows user to select days to filter by date */}

                <Grid item>
                    <Card style={{background: "#252531"}}>
                        <div style={{padding: "10px 20px 10px 24px", marginTop: "10px", display: "flex", alignItems: "center", borderBottom: "1px #ccc solid"}}>
                            <Typography variant="h6" style={{marginRight: "8px"}}>Calendar</Typography>
                            <Typography variant="h6" style={{lineHeight: "20px"}}><Event /></Typography>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                                openTo="day"
                                value={selectedDay}
                                onChange={(newDay) => {
                                    setSelectedDay(newDay);
                                }}
                                showToolbar={false}
                                views={['day']}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Card>
                </Grid>
                
                {/* section for creating new tasks */}

                <Grid item>
                    <div style={{width: "320px"}}>
                        
                        {/* handles logic for toggling create task menu visibility */}

                        <motion.button
                            whileTap={{scale: 0.98}}
                        >
                            <button 
                                type="button" 
                                class={classes.primaryButton}
                                onClick={toggleMenu}
                            >
                                New Task +
                            </button>
                        </motion.button>
                        
                        {/* if menuOpen is true, render the prompts for the user to enter info and create a new task */}

                        {menuOpen &&
                            <motion.div
                                initial={{opacity: 0, y: 2}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.2}}
                            >
                                <Card style={{padding: "18px", margin: "10px 0px", overflowY: "auto", height: "370px"}}>
                                    
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
                                                onClick={addTask}
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
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                        </motion.button>

                                    </div>
                                </Card>
                            </motion.div>
                        }
                    </div>
                </Grid>
            </Grid>

            {/* filtering section */}
            
            <div class="mr-auto ml-auto" style={{maxWidth: "650px"}}>

                {/* renders filtering options, handles logic for updating the filterOption state variable */}
                {/* changes styling of button if the filterOption of the given item of the array is selected */}

                <div class="flex mb-2" style={{alignItems: "center", justifyContent: "center"}}>
                    <span class="mr-2"><i class="fas fa-filter" /></span>
                    {['None', 'Tag', 'Priority'].map((value) => (
                        <>
                            {value !== filterOption ? 
                                <button onClick={() => setFilterOption(value)} class={classes.unselectedFilterOption}>{value}</button>
                                :
                                <button onClick={() => setFilterOption(value)} class={classes.selectedFilterOption}>{value}</button>
                            }
                            
                        
                        </>
                    ))}
                </div>

                {/* renders textfield and button that allows user to filter by tag if the 'Tag' option is chosen */}

                <div class="flex mb-4" style={{alignItems: "center", justifyContent: "center"}}>
                    {filterOption === "Tag" && 
                        <>
                            <div class="relative flex flex-wrap items-stretch">
                                <span
                                    class={classes.textfieldIcon}
                                >
                                    <i class="fas fa-hashtag"></i>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Filter by tag"
                                    class={classes.textfieldWithIcon}
                                    value={searchTag}
                                    onChange={(e) => setSearchTag(e.target.value)}
                                />
                            </div>
                            {/* runs the filterTasks function once clicked */}
                            <button onClick={filterTasks} style={{padding: "5px", height: "42px", width: "42px", marginLeft: "5px"}} class="bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition ease-in duration-200"><i class="fas fa-search" /></button>
                        </>
                    }
                    
                    {/* if user is filtering by priority, 3 buttons will be rendered that allows user to select which priority to filter by */}

                    {filterOption === "Priority" && 
                        <div class="relative flex justify-center space-items">
                            {['High', 'Medium', 'Low'].map((value) => (
                                <>
                                    {/* the filterTask function is ran, except now the value from the map function is passed through */}

                                    {value !== priorityFilter ? 
                                        <button onClick={() => filterTasks(value)} class={classes.unselectedPriorityButton}>{value}</button>
                                        :
                                        <button onClick={() => filterTasks(value)} class={classes.selectedPriorityButton}>{value}</button>
                                    }
                                
                                </>
                            ))}
                        </div>
                    }
                </div>
                
            </div>
            
            {/* if tasks exists (ensures that the tasks variable has a value before React tries to render data) then render the filteredTasks and pass each datapoint from each task to a TaskCard component */}
            {/* in addition, the deleteTask and editTask functions are passed through, which allows each task to be edited and deleted when they are ran within the TaskCard component */}

            {tasks && filteredTasks.map((task) => (
                <TaskCard
                    key={task.id}
                    Title={task.Title} 
                    Description={task.Description} 
                    Date={task.Date}
                    Tag={task.Tag}
                    Priority={task.Priority}
                    Completed={task.Completed}
                    id={task.id}
                    deleteTask={deleteTask}
                    editTask={editTask}
                />
            ))}
        </div>
    )
}

export default Tasks
