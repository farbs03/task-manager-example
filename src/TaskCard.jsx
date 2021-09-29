import React, {useState} from "react"
import {Checkbox, Grid, Card, Typography, Grow} from "@mui/material"
import { Event, CheckCircleOutline, RadioButtonUnchecked } from "@mui/icons-material";

const TaskCard = ({Title, Description, Date}) => {

    const [checked, setChecked] = useState(false)
  
    return (
        <Grow in>
            <Card 
                style={{margin: "10px auto", padding: "15px", maxWidth: "640px"}}
                elevation={4}
            >
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" style={{textDecoration: checked ? "line-through" : "none"}}>{Title}</Typography>
                        <Grid container style={{opacity: "0.8"}}>
                            <Grid item>
                               <Event style={{width: "1.0rem", height: "1.0rem", marginRight: "5px"}}/>
                            </Grid>
                            <Grid item style={{lineHeight: "15px"}}>
                                <Typography variant="caption">{Date}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Checkbox checked={checked} onChange={() => setChecked(!checked)} icon={<RadioButtonUnchecked style={{width: "28px", height: "28px"}} />} checkedIcon={<CheckCircleOutline style={{color: "#00be2b", width: "28px", height: "28px"}} />} />
                    </Grid>
                </Grid>
                <Typography style={{marginTop: "5px"}}>{Description}</Typography>
            </Card>
        </Grow>
    )
}

export default TaskCard;
