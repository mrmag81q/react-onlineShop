import {  Grid } from "@mui/material";
import React from "react";

import Products from "../../componant/pruduct/products.view";
import Header from "../../componant/header/header.component";

export default function Product(){
    return(
        <Grid>
            <Grid item>
                <Header/>
            </Grid>
            <Grid item sx={{marginTop:"150px"}}>
                <Products/>
            </Grid>
        </Grid>
    );
}