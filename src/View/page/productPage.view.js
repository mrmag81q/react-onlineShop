import { Box, Button, Divider, Grid } from "@mui/material";
import React, { useState,useEffect } from "react";
import Navproductp from "../../componant/navproductp/navproductp.component";
import CustopPaging from "../../componant/CustomPaging/CustomPaging.component";
import Header from "../../componant/header/header.component";
import { Cards } from "../../componant/card/card.mock";
import { AddShoppingCart, LocalShipping } from "@mui/icons-material";
import { NumericStepper } from '@anatoliygatt/numeric-stepper';
import { useParams } from "react-router-dom";
import {useCountSetState} from '../../context';
export default function Product() {
    var _ = require('lodash');
    const setCount =  useCountSetState();
    const {productPagename} = useParams();
    const productPagename1 = {productPagename};
    const INITIAL_VALUE = 1;
    const max_VALUE = 3;
    const [value, setValue] = useState(INITIAL_VALUE);
    
      
    
    let pr =Cards.findIndex(obc => obc.title === productPagename1.productPagename);
    
    let buy = {name:Cards[pr].title,price:Cards[pr].price,img:Cards[pr].img,quantity:value,brand:Cards[pr].brand,p:Cards[pr].price*value};
    
    let buyA = JSON.parse(localStorage.getItem('buyA'));
    
   
    useEffect(() => {
        setCount(buyA.length)
    }, [])
    
    const set= ()=>{
        
        if(Array.isArray(buyA)===false){
            
           buyA=[];
           buyA.push(buy);
           localStorage.setItem('buyA',JSON.stringify(buyA));
           
           setCount(buyA.length)
           
           
        }
        else{
            let br =buyA.findIndex(obc => obc.name === Cards[pr].title);
            if(br===-1){
                buyA.push(buy);
                
                localStorage.setItem('buyA',JSON.stringify(buyA));
                
                setCount(buyA.length)
                
            }
            else{
                buyA[br].quantity+=buy.quantity;
                if(buyA[br].quantity>5){
                    buyA[br].quantity=max_VALUE;
                    localStorage.setItem('buyA',JSON.stringify(buyA));
                    setCount(buyA.length)
                   
                }
                else{
                    localStorage.setItem('buyA',JSON.stringify(buyA));
                    setCount(buyA.length)
                   
                }
                
            }
        }
        
        
        
        
        
    
}
    return (
        <Grid >
            <Grid >
                <Header />
            </Grid>
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                sx={{ marginTop: "150px", direction: "rtl" }}>
                <Grid item sm={12} md={6} lg={3}>

                    <CustopPaging />

                </Grid>

                <Grid item
                    container
                    direction="column"
                    justifyContent="center"

                    sm={12} md={6} lg={4}
                    sx={{ alignItems: "top", marginRight: "20px" }}
                >
                    <Grid item sx={{ fontSize: "30px", fontWeight: "bold" }}>
                        <p>{Cards[pr].title}</p>

                    </Grid>
                    <Divider variant="inset" sx={{ backgroundColor: "black" }} />
                    <Grid item sx={{ direction: "rtl" }}>
                        <ul>
                            <li>برند : {Cards[pr].brand}</li>
                            <br></br>
                            <li>موجود است</li>
                            <br></br>
                            <li>آماده ارسال</li>
                        </ul>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={6} lg={4} >
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: "350px", height: "340px", border: "1px solid gray", borderRadius: "5%" }}>

                        <Grid item>
                            <p style={{ fontSize: "35px" }}>
                                <span>{Cards[pr].price}</span>
                                <span style={{ marginLeft: "1px", marginRight: "1px" }}> </span>
                                تومان
                            </p>
                        </Grid>
                        <Grid item>
                            <NumericStepper
                                minimumValue={0}
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
                        <br></br>
                        <br></br>
                        <Grid item>
                            <Button onClick={()=>set()} sx={{fontSize:"20px"}}  variant="contained" startIcon={<AddShoppingCart  sx={{marginLeft:"9px !important",fontSize:"30px !important"}}  />}>
                                افزودن سبد خرید
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
             <br></br>
            <Grid sx={{direction:"rtl"}}>
                    <Navproductp/>
            </Grid>
        </Grid>
    );
}