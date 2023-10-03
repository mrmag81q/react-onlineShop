import { Add } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React,{useState} from "react";
import styles from "./swipabledrawer.module.scss";

export default function SwipeableDrawer1(){

    const [open, setopen] = useState(styles.sheet);
    const click2l = () => {
      setopen(!open);
    }
    return (
        <div className={open ? `${styles.sheet}` : `${styles.sheet2}`}>
        <Grid container sx={{ height: "10px",marginTop:"3px" }}>
          <Grid item container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
          >
          </Grid>
        </Grid>
        <div sx={{ position: "absolute", transition: "all 2s" }}>
          <IconButton className={styles.bst} onClick={() => click2l()}>
            <Add />
          </IconButton>
        </div>
      </div>
    );
  }
