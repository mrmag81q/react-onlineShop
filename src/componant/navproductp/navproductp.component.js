import React, { useState } from "react";
import PropTypes from 'prop-types';
import Styles from "./navproductp.module.scss";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { Cards } from "../card/card.mock";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function Navproductp() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{direction:"rtl"}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider',direction:"rtl" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab sx={{ fontSize: "20px" }} {...a11yProps(0)} label="مشخصات" />
                    <Tab sx={{ fontSize: "20px" }} {...a11yProps(1)} label="نظرات کاربران" />

                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
               <table style={{direction:"rtl"}}>
                    {
                        Cards[1].property.map((item) =>{
                            return(
                                <tr>
                                    <td>{item.val}</td>
                                    <td>{item.name}</td>
                                </tr>
                            );
                        })
                    }
               </table>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>

        </Box>
    );
}