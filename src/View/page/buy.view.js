import { Button, Divider, Grid, IconButton, List } from '@mui/material';
import React, { useState, useEffect, Fragment } from 'react';
import Header from "../../componant/header/header.component";
import { Cards } from "../../componant/card/card.mock";
import Stylea from "./buy.module.scss";
import { NumericStepper } from '@anatoliygatt/numeric-stepper';
import { Delete } from '@mui/icons-material';
import {useCountSetState}  from '../../context'
export default function Home() {
    var _ = require('lodash');
    const setCount = useCountSetState();
    let buy1 = JSON.parse(localStorage.getItem('buyA'));
    
    const [buy2, setbuy2] = useState();
    
    const [y, sety] = useState(0);
    const u = () => {
        
        let g = 0
        if(buy1 == null){
            g=0;
        }
        else{
        buy1.map((item) => {

            g += item.p;
        });}
        sety(g);
    }
    const i = (x) => {
        if(x.quantity < 3){
       return  x.quantity = x.quantity +  value;
        }
        console.log(x);
    }
    const oc = () =>{
        if(buy1 != null){
        setCount(buy1.length)

        }
    }
    useEffect(() => {
        u();
        oc();
    }, [buy2])
    const INITIAL_VALUE = 1;
    const max_VALUE = 3;
    const [value, setValue] = useState(INITIAL_VALUE);
    return (
        <Grid>
            <Grid>
                <Header />
            </Grid>
            <Grid sx={{ marginTop: "120px", direction: "rtl" }}
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >

                <Grid item md={8} className={Stylea.productOP}

                >
                    {


                        buy1 === null ? 'کالایی موجود نیست' : buy1.map((item) => {
                            return (
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="flex-end"
                                >
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="flex-start"
                                        alignItems="center"

                                        item md={2}>
                                        <br></br>
                                        <img width="114px" height="114px" src={item.img} />
                                        <br></br>
                                        <br></br>
                                        <p style={{ fontSize: "17px", fontWeight: "bold" }}>تعداد کالا : {item.quantity}</p>
                                    </Grid>

                                    <Grid item
                                    
                                        container
                                        direction="column"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"

                                        md={10}>
                                        <Grid item
                                        container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="flex-start"
                                            md={4}
                                            
                                            >
                                            <Grid item md={10} sx={{borderBottom:"1px solid black"}}>
                                                <p style={{ fontSize: "25px", fontWeight: "bold", padding: "0 !important", margin: "0 !important" }}>{item.name}</p>
                                            </Grid>
                                            <Grid item
                                            container
                                            justifyContent="flex-end"
                                             md={2}>
                                                <IconButton color='error' size='large' onClick={() => {
                                                    buy1 = buy1.filter(val => val.name !== item.name);
                                                    setbuy2(buy1)

                                                    localStorage.setItem('buyA', JSON.stringify(buy1));
                                                    oc();
                                                   
                                                }}><Delete /></IconButton>
                                            </Grid>
                                        </Grid>

                                        <Grid item
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="flex-end"
                                            md={8}>
                                                <Grid item sx={{ direction: "rtl" }}>
                                            <ul>
                                                <li>برند : {item.brand}</li>
                                                <br></br>
                                                <li>موجود است</li>
                                                <br></br>
                                                <li>آماده ارسال</li>
                                            </ul>
                                        </Grid>
                                        <Grid item sx={{padding:"10px"}}>
                                            <NumericStepper
                                                minimumValue={INITIAL_VALUE}
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
                                                    i(item);
                                                }}
                                            />
                                        </Grid>
                                        </Grid>
                                        
                                        
                                    </Grid>
                                    
                                </Grid>
                            );
                        })


                    }
                </Grid>
                <Divider variant='middle' />
                <Grid item
                    container
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"

                    md={2} sx={{ minWidth: "255px", minHeight: "245px", border: "1px solid gray", borderRadius: "5%", marginTop: "10px", maxWidth: "255px !important", maxHeight: "245px !important" }}>
                    <Grid item>
                        <p>جمع فاکتور : {y} </p>
                    </Grid>

                    <Grid item>
                        <Button variant='contained' sx={{ backgroundColor: "red" }}>نهایی کردن سفارش </Button>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>

    );
}