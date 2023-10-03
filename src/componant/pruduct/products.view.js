import { Grid, Button, Stack, Drawer, Accordion, AccordionSummary, Typography, AccordionDetails, FormControl, InputLabel, Select, MenuItem, SwipeableDrawer } from '@mui/material';
import React, { useState, useEffect, useInsertionEffect } from 'react';
import { Cards } from "../../componant/card/card.mock";
import Card1 from "../../componant/card/card.component"
import { Box } from '@mui/system';
import Filter from '../filter/filter.component';
import Style from '../header/header.module.scss';
export default function Products() {
    const [moratab, setmoratab] = useState('');

    const handleChange = (event) => {
        setmoratab(event.target.value);
    };






    const [c, setc] = useState(Cards);

    useEffect(() => {

    }, [c])


    return (
        <Box sx={{ width: '100%' }}>
            <Grid container columnSpacing={2} sx={{ justifyContent: "center" }}>
                <Grid item  >
                    <Filter/>
                </Grid>
                <Grid item >
                    <FormControl sx={{ width: "150px" }}>
                        <InputLabel id="demo-simple-select-label">مرتب سازی</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={moratab}
                            label="مرتب سازی"
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value={10}>ارزان ترین</MenuItem>
                            <MenuItem value={20}>گران ترین</MenuItem>
                            <MenuItem value={30}>جدید ترین</MenuItem>
                            <MenuItem value={40}>محبوب ترین</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>


            <br />
            <Grid container columnSpacing={2} sx={{ justifyContent: "center" }}>
                {

                    c.map((item) => {
                        return (
                            <Grid item key={item.id} sx={{ color: "red", marginRight: "5px", marginBottom: "15px", marginLeft: "5px", justifyContent: "center" }} xs={12} md={3}  sm={4} lg={2} >
                                <Card1 data={item} />

                            </Grid>
                        );
                    }
                    )
                }
            </Grid>
        </Box>
    );
}