import { Card, CardContent, CardMedia, Typography, Grid, CardActions, Button, Rating, SwipeableDrawer, IconButton, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Color } from "../../mock/color.mock";
import styles from "./card.module.scss";
import SwipeableEdgeDrawer1 from '../swipabledrawer/swipabledrawer.component';
import { Box } from '@mui/system';
import { NumericStepper } from '@anatoliygatt/numeric-stepper';
import { Add, Close } from '@mui/icons-material';

import { useCountSetState } from '../../context'

export default function Card1(props) {
    const setCount = useCountSetState();


    const [selectedValue, setSelectedValue] = useState();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const [Opened, setOpened] = useState(false);

    const open = () => {

        setOpened(!Opened);
    }


    const INITIAL_VALUE = 1;
    let max_VALUE = 3
    const [valueR, setValueR] = useState(2);
    const [value, setValue] = useState(INITIAL_VALUE);

    const [idata, setIdata] = useState(props.data);

    const thun = (e) => {
        var num_parts = e.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return (num_parts);
    }
    let buy = { name: idata.title, price: idata.price, img: idata.img, quantity: value, brand: idata.brand, p: idata.price * value };
    let buyA = JSON.parse(localStorage.getItem('buyA'));
    const set = () => {

        if (Array.isArray(buyA) === false) {

            buyA = [];
            buyA.push(buy);
            localStorage.setItem('buyA', JSON.stringify(buyA));
            setCount(buyA.length)


        }
        else {
            let br = buyA.findIndex(obc => obc.name === idata.title);
            if (br === -1) {
                buyA.push(buy);

                localStorage.setItem('buyA', JSON.stringify(buyA));

                setCount(buyA.length)

            }
            else {
                buyA[br].quantity += buy.quantity;
                if (buyA[br].quantity > 5) {
                    buyA[br].quantity = max_VALUE;
                    localStorage.setItem('buyA', JSON.stringify(buyA));
                    setCount(buyA.length)

                }
                else {
                    localStorage.setItem('buyA', JSON.stringify(buyA));
                    setCount(buyA.length)

                }

            }
        }
    }
    return (
        <div className={styles.app}>
            <Card sx={{ maxWidth: 256, height: "auto", marginLeft: "auto", marginRight: "auto", borderRadius: "10px" }} className={styles.cardf}>

                <CardMedia
                    component="img"
                    image={idata.img}
                    alt="کالا"
                />
                <CardContent sx={{ justifyItems: "center", zIndex: "1000px" }}>
                    <Grid className={styles.center}>
                        {idata.color.map((color, index) => {
                            return (
                                <Box key={index} variant="body1" className={styles.circle1} sx={{ backgroundColor: `${color.name}` }}>
                                </Box>
                            );
                        })}
                    </Grid>
                    <br></br>
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                        {idata.title}
                    </Typography>
                    <br></br>
                    <Typography variant="h4" color="text.secondary" sx={{ fontSize: "small", textAlign: "center" }} className={styles.elip}>
                        {idata.text}
                    </Typography>
                    <br></br>
                    <Typography variant="body1" color="Highlight" sx={{ textAlign: "center", fontSize: "25px" }}>
                        {thun(idata.price)}
                    </Typography>
                    <br></br>
                </CardContent>
                <br></br>
                <div className={Opened ? styles.slided : styles.slide}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        alignItems="center"

                    >
                        <Grid item
                            container
                            direction="row"
                            justifyItems="start"
                            xs={2}>
                            {
                                Opened
                                    ? <IconButton onClick={open}>
                                        <Close />
                                    </IconButton>
                                    : <IconButton onClick={open}>
                                        <Add />
                                    </IconButton>
                            }
                        </Grid>
                        <Grid item xs={2}>
                            <Rating

                                value={valueR}
                                onChange={(event, newValue) => {
                                    setValueR(newValue);
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <NumericStepper
                                minimumValue={1}
                                maximumValue={max_VALUE}
                                stepValue={1}
                                initialValue={INITIAL_VALUE}
                                size="sm"
                                inactiveTrackColor="#fed7aa"
                                activeTrackColor="#fddec0"
                                activeButtonColor="#ffedd5"
                                inactiveIconColor="#fb923c"
                                hoveredIconColor="#ea580c"
                                activeIconColor="#9a3412"
                                disabledIconColor="#fdba74"
                                thumbColor="#f97316"
                                thumbShadowAnimationOnTrackHoverEnabled={false}
                                focusRingColor="#fff7ed"
                                onChange={(value) => {
                                    setValue(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl>

                                <RadioGroup
                                    row

                                >
                                    {

                                        idata.color.map((item) => {

                                            return (

                                                <FormControlLabel

                                                    control={
                                                        <Radio

                                                            onChange={handleChange}
                                                            value={`${item.id}`}
                                                            name={`${item.name}`}
                                                            inputProps={{ 'aria-label': `${item.name}` }}
                                                            sx={{
                                                                color: item.name,
                                                                '&.Mui-checked': {
                                                                    color: item.name,
                                                                },
                                                            }}
                                                        />
                                                    }

                                                />

                                            );
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" sx={{ textAlign: "center", color: "black" }} onClick={set}>خرید</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Link to={"/productPage" + "/" + `${idata.title}`} className={styles.text}>
                                <Button variant="contained" sx={{ textAlign: "center", color: "black" }}>اطلاعات بیشتر</Button>
                            </Link>
                        </Grid>


                    </Grid>


                </div>

            </Card>
        </div>
    );

}

