import { Box, Button, Grid } from "@mui/material";
import React from "react";
import Styles from "./CustomPaging.module.scss";
import {Cards} from '../card/card.mock';
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
export default function CustopPaging() {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", backgroundColor: "gray",borderRadius:"100%" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", backgroundColor: "gray",borderRadius:"100%" }}
            onClick={onClick}
          />
        );
      }
    const settings = {
        // customPaging: function(i) {
        //     return (
           
        //        <img width="80"  src={Cards[i].img} />
                
          
        //     );
        // },
        dots: true,
       
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
        
    }
    return (

        <Box  sx={{width:"300px",color:"black" }}>
            
                <Slider {...settings}>
                <div>
                    <img width="300"   src={Cards[0].img} />
                </div>
                <div>
                    <img width="300"  src={Cards[1].img} />
                </div>

                </Slider>
           
        </Box>
    );
}
