import { CheckBoxRounded, Close, Expand, ExpandCircleDown, RadioButtonChecked, RadioButtonCheckedOutlined, RadioButtonUnchecked, Tune } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Slider, SwipeableDrawer, Switch, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Style from "../header/header.module.scss";
import { Color } from "../../mock/color.mock";
import { Filterable } from "../../mock/filterable.mock";

function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 1000;

export default function Filter() {
    let x = 0;



    const [value1, setValue1] = useState([2000, 150000]);
    const [value2, setValue2] = useState([2000]);
    const [value3, setValue3] = useState([15000]);

    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
            setValue2([Math.min(newValue[0], value1[1] - minDistance)]);
            setValue3([value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
            setValue2([value1[0]]);
            setValue3([Math.max(newValue[1], value1[0] + minDistance)]);

        }

    };
    const setchange = () => {
        let price1 = Filterable.findIndex(obc => obc.propertyname == "price");
        let h = Filterable[price1].selectedValius.length;
        delete Filterable[price1].selectedValius[h-1];
        Filterable[price1].selectedValius.push(value1);
        console.log(Filterable[price1]);
    }

    const [formval, setformval] = useState([]);


    const handleChange = (e) => () => {

        let y = formval[e].value;
        let x = !y;
        formval[e].value = x;
        let kal = formval[e].name;
        let objectx = Filterable.findIndex(obj => obj.propertyname === kal);
        let final = formval[e].valp
        if (x == true) {

            Filterable[objectx].selectedValius.push(final);
        }
        else {
            let objy = Filterable[objectx].selectedValius.findIndex(ob => ob === final)
            delete Filterable[objectx].selectedValius[objy]
        }

        console.log(formval[e]);
        console.log(Filterable[objectx]);

    }




    const [drawerstate, setdrawerstate] = useState(false);
    const toggleDrawer = (open) => () => {

        setdrawerstate(open);
    };
    return (
        <Box>
            <Button variant="contained" endIcon={<Tune sx={{ marginBottom: "2px" }} />} onClick={toggleDrawer(true)} sx={{ height: "56px", backgroundColor: `${Color[0].name}` }}>فیلتر</Button>
            <SwipeableDrawer
                anchor="right"
                open={drawerstate}
                onClose={toggleDrawer(false)}

            >
                <Box sx={{ width: "250px" }} >
                    <Grid container sx={{ width: "220px", margin: "20px", direction: "rtl" }} >
                        <Grid item>
                            <Typography variant="h5" >
                                فیلترها
                            </Typography>
                            <br></br>
                            {
                                Filterable.map((item, index) => {
                                    return (
                                        <Box key={index}>
                                            <Accordion sx={{ width: "220px" }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandCircleDown sx={{ color: `${Color[0].name}` }} />}
                                                >

                                                    <Typography>{item.propertyname}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {
                                                        item.c.map((c, index1) => {
                                                            if (item.propertyname === "price") {
                                                                return (<Box>
                                                                    <p>از
                                                                        <span style={{ marginLeft: "1px", marginRight: "1px" }}> </span>
                                                                        <span>{value2}</span>
                                                                        <span style={{ marginLeft: "1px", marginRight: "1px" }}> </span>
                                                                        تومان
                                                                    </p>
                                                                    <p>
                                                                        تا
                                                                        <span style={{ marginLeft: "1px", marginRight: "1px" }}> </span>
                                                                        <span>{value3}</span>
                                                                        <span style={{ marginLeft: "1px", marginRight: "1px" }}> </span>
                                                                        تومان
                                                                    </p>
                                                                    <Slider
                                                                        getAriaLabel={() => 'Minimum distance'}
                                                                        value={value1}
                                                                        onChange={handleChange1}
                                                                        step={1000}

                                                                        min={Filterable[2].valitionArray[0]}
                                                                        max={Filterable[2].valitionArray[1]}
                                                                        disableSwap

                                                                    />
                                                                    <br>
                                                                    </br>
                                                                    <br></br>
                                                                    <Button variant="contained"  className={Style.buttonsabt}  onClick={setchange}>
                                                                        اعمال محدوده قیمت
                                                                    </Button>


                                                                </Box>);
                                                            }
                                                        })
                                                    }
                                                    <FormGroup>
                                                        {
                                                            item.valitionArray.map((valitionArray, index1) => {

                                                                x = x + 1;
                                                                formval.push({ name: item.propertyname, value: false, valp: valitionArray })

                                                                if (item.propertyname !== "price") {
                                                                    return (<FormControlLabel key={index1} control={<Checkbox checked={formval.value} onChange={handleChange(x - 1)} value={valitionArray} sx={{ color: `${Color[0].name}` }} checkedIcon={<CheckBoxRounded sx={{ color: `${Color[0].name}` }} />} />} label={valitionArray} />);
                                                                }
                                                            })
                                                        }
                                                    </FormGroup>

                                                </AccordionDetails>
                                            </Accordion>
                                            <br></br>
                                        </Box>
                                    );
                                })
                            }
                            <br></br>
                            <br></br>
                            <Button variant="contained" endIcon={<Close />} className={Style.buttonClose} sx={{ marginLeft: "30px", marginBottom: "10px" }} onClick={toggleDrawer(false)}>
                                بستن
                            </Button>
                        </Grid>
                    </Grid>
                    <br></br>

                </Box>
            </SwipeableDrawer>
        </Box>
    );
} 