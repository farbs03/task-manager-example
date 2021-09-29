import React, {useState} from "react"
import {Checkbox, Grid, Card, Typography, Grow} from "@mui/material"
import { Event, CheckCircleOutline, RadioButtonUnchecked } from "@mui/icons-material";

const Task = ({Title, Description, Date}) => {

    const [checked, setChecked] = useState(false)
  
    return (
        <Grow in>
            <Card 
                style={{margin: "10px auto", padding: "20px"}}
                elevation={4}
            >
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6">{Title}</Typography>
                        <Grid container alignItems="center" style={{opacity: "0.8"}}>
                            <Grid item>
                            <Typography variant="caption"><Event style={{width: "0.9rem", height: "0.9rem", marginRight: "5px"}}/></Typography>
                            </Grid>
                            <Grid item style={{lineHeight: "12px"}}>
                            <Typography variant="caption">{Date}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Checkbox checked={checked} onChange={() => setChecked(!checked)} icon={<RadioButtonUnchecked style={{width: "28px", height: "28px"}} />} checkedIcon={<CheckCircleOutline style={{color: "#00be2b", width: "28px", height: "28px"}} />} />
                    </Grid>
                </Grid>
                <Typography style={{marginTop: "10px"}}>{Description}</Typography>
            </Card>
        </Grow>
    )
}

export default Task;
