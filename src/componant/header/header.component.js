
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Badge, Button, Drawer, Grid, Icon, IconButton, Paper, SwipeableDrawer, Toolbar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import image1 from "../../Static/img/Logo.png";
import icon_contact from "../../Static/img/icons8-contact-us-64.png";
import Style from "./header.module.scss";
import InputBase from '@mui/material/InputBase';
import { Color } from "../../mock/color.mock";
import { ArrowBack, Close,  ExitToApp,  ExpandCircleDown, Home, Menu, Redo, Search, ShoppingCart } from "@mui/icons-material";
import { Box } from "@mui/system";
import axios from "axios";
import { Link } from "react-router-dom";

import {useCountState} from "../../context";
import { useContext } from "react";

export default function Header() {
  
  const Context = useCountState();
  
  let ApiUrl = 'https://amirbay.ir/api/goodsgroupapi/GetAllGoodGroup';

  const [Elements, setElements] = useState("");

  let ParentID = '';
  let data = [];

  let root = '89c9b98a-456e-47b3-8e9b-9c1abb7b9223';

  const DataLoad = async (e) => {
    let idata = await axios.get(ApiUrl)
      .then((response) => {

        data = response.data;
        LoadLevel1();
        

      });

  }


  const loadParents = (id) => {
    let parrent = data.find(e => e.GroupID === id);

    let parrents = data.filter(e => e.ParentID === parrent.ParentID);
    setElements();
    let newbutton = <div>

      {parrent.ParentID !== root.toLowerCase() ? <div><Button variant="contained" endIcon={<Redo />} className={Style.buttonClose} id={id} onClick={() => loadParents(parrent.ParentID)}><i></i> بازگشت</Button><br></br><br></br></div> : <div></div>}


      {
        parrents.map((item, index) => {

          if (item.hasChild === 0) {
            return (
              <div key={index} id={item.GroupID}>
                <Link to= {'https://amirbay.ir/good/products/?filter=GroupId='+item.GroupID} className={Style.text}  >
                  <Typography className={Style.typo1}>
                    <span style={{ paddingRight: "10px" }}>
                      {item.GroupName}
                    </span>
                  </Typography>
                </Link>
              </div>
            );
          }
          else {
            return (
              <div >
           
              <div key={index} id={item.GroupID}>
              <Grid container className={Style.typo1}>
              <Grid item xs={10}>
                <Link to= {'https://amirbay.ir/good/products/?filter=GroupId='+item.GroupID} className={Style.text}  >
                  
                   
                      <span style={{ paddingRight: "10px" }}>
                        {item.GroupName}
                      </span>
  
  
  
                  
  
                </Link>
                </Grid>
                <Grid item xs={2} className={Style.textal}><a  id={item.GroupID} onClick={() => loadChilds(item.GroupID)}><ArrowBack className={Style.taga}/>
                    </a></Grid>
                </Grid>
  
              </div>
  
            </div>
            );
          }

        })
      }
    </div>;
    setElements(newbutton);

  }

  const loadChilds = (id) => {

    let Childs = data.filter(e => e.ParentID === id);
    setElements();
    let newbutton = <div>
      <Button variant="contained" endIcon={<Redo />} className={Style.buttonClose} id={id} onClick={() => loadParents(id)}><i></i> بازگشت</Button>
      <br></br>
      <br></br>
      {
        Childs.map((item, index) => {

          if (item.hasChild === 0) {
            return (
              <div key={index} id={item.GroupID}>
                <Link to= {'https://amirbay.ir/good/products/?filter=GroupId='+item.GroupID} className={Style.text}  >
                  <Typography className={Style.typo1}>
                    <span style={{ paddingRight: "10px" }}>
                      {item.GroupName}
                    </span>
                  </Typography>
                </Link>
              </div>);
          }
          else {
            return (
              <div >
           
              <div key={index} id={item.GroupID}>
              <Grid container className={Style.typo1}>
              <Grid item xs={10}>
                <Link to= {'https://amirbay.ir/good/products/?filter=GroupId='+item.GroupID} className={Style.text}  >
                  
                   
                      <span style={{ paddingRight: "10px" }}>
                        {item.GroupName}
                      </span>
  
  
  
                  
  
                </Link>
                </Grid>
                <Grid item xs={2} className={Style.textal}><a  id={item.GroupID} onClick={() => loadChilds(item.GroupID)}><ArrowBack className={Style.taga}/>
                    </a></Grid>
                </Grid>
  
              </div>
  
            </div>);
          }
        })
      }
    </div>;
    setElements(newbutton);

  }




  const [drawerstate, setdrawerstate] = useState(false);


  const toggleDrawer = (open) => () => {

    setdrawerstate(open);
  };

  useEffect(() => {
    DataLoad();
    
  }, [])


  const LoadLevel1 = () => {

    let Neighbours = data.filter(e => e.ParentID === root.toLowerCase());
    let element = Neighbours.map((item, index) => {
      if (item.hasChild === 0) {
        return (
          <div key={index} id={item.GroupID} className={Style.textcolor}>
            <Link to= {'https://amirbay.ir/good/products/?filter=GroupId='+item.GroupID} className={Style.text}  >
              <Typography className={Style.typo1}>
                <span style={{ paddingRight: "10px" }}>
                  {item.GroupName}
                </span>
              </Typography>
            </Link>
          </div>

        );
      }
      else {
        return (
          <div className={Style.textcolor}>
           
            <div key={index} id={item.GroupID}>
            <Grid container className={Style.typo1}>
            <Grid item xs={10}>
              <Link to= {'https://amirbay.ir/good/products/?filter=GroupId='+item.GroupID} className={Style.text}  >
                
                 
                    <span style={{ paddingRight: "10px" }}>
                      {item.GroupName}
                    </span>



                

              </Link>
              </Grid>
              <Grid item xs={2} className={Style.textal}><a  id={item.GroupID} onClick={() => loadChilds(item.GroupID)}><ArrowBack className={Style.taga}/>
                  </a></Grid>
              </Grid>

            </div>

          </div>
        );

      }
    });

    setElements(element);


  }




  return (
    <Box>
      <AppBar sx={{ direction: "rtl", backgroundColor: `${Color[0].name}` }} position="fixed">

        <Toolbar>
          <Link to="/"><img src={image1} alt="logo amirbay" width="75" height="75" style={{ margin: "5px" }} /></Link>
          <Paper
            className={Style.search}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', marginRight: "50px", backgroundColor: `${Color[1].name}`, borderRadius: "10px" }}
          >
            <IconButton sx={{ p: '5px', marginLeft: "5px" }} aria-label="search">
              <Search />
            </IconButton>

            <InputBase
              sx={{ mr: 0.25, flex: 1 }}
              placeholder="جستوجو  "
              inputProps={{ 'aria-label': 'search' }}
            />

          </Paper>

          <Box className={Style.flex} />
          <Link to="/product" className={Style.text}>
          <Button variant="contained" endIcon={<ExitToApp />} sx={{ direction: "ltr", color: "white" }} className={Style.button} >
          لیست محصولات 
          </Button>
          </Link>
          <Link to="/buy" className={Style.text56}>
          <IconButton color="inherit" sx={{ marginRight: "10px" }} className={Style.box}>
            <Badge badgeContent={Context} color="error">
              <ShoppingCart sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
          </Link>

          <IconButton color="inherit" onClick={toggleDrawer(true)} >
            <Menu sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Toolbar>
        <SwipeableDrawer
          anchor="right"
          open={drawerstate}
          onClose={toggleDrawer(false)}

        >
          <Box
            sx={{ direction: "rtl", width: "250px", p: 1 }}

            role="presentation"
            onKeyDown={toggleDrawer(false)}
          >
            <Link to="/" className={Style.text}>
              <Typography className={Style.typo}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" className={Style.text} stroke="#1a237e" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.77778 10.2222V18C5.77778 19.1046 6.67321 20 7.77778 20H12M5.77778 10.2222L11.2929 4.70711C11.6834 4.31658 12.3166 4.31658 12.7071 4.70711L17.5 9.5M5.77778 10.2222L4 12M18.2222 10.2222V18C18.2222 19.1046 17.3268 20 16.2222 20H12M18.2222 10.2222L20 12M18.2222 10.2222L17.5 9.5M17.5 9.5V6M12 20V15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <span style={{ paddingRight: "10px" }}>
                  صفحه اصلی
                </span>
              </Typography>
            </Link>
            <Accordion sx={{ marginBottom: "5px" }}>
              <AccordionSummary
                expandIcon={<ExpandCircleDown sx={{ color: `${Color[0].name}`}}/>}
                aria-controls="panel1a-content"
                className={Style.typo12}
              >
                <Typography >
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" className={Style.text}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.17004 7.43994L12 12.5499L20.77 7.46991" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 21.6099V12.5399" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.92999 2.48L4.59 5.45003C3.38 6.12003 2.39001 7.80001 2.39001 9.18001V14.83C2.39001 16.21 3.38 17.89 4.59 18.56L9.92999 21.53C11.07 22.16 12.94 22.16 14.08 21.53L19.42 18.56C20.63 17.89 21.62 16.21 21.62 14.83V9.18001C21.62 7.80001 20.63 6.12003 19.42 5.45003L14.08 2.48C12.93 1.84 11.07 1.84 9.92999 2.48Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 13.24V9.58002L7.51001 4.09998" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  <span style={{ paddingRight: "10px" }}>
                    کالای دیجیتال
                  </span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails >
                <Box >
                  {Elements}
                </Box>
              </AccordionDetails>
            </Accordion>


            <Link to="/" className={Style.text}>
              <Typography className={Style.typo}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" className={Style.text}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5ZM7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM7.45609 16.7264C6.40184 17.1946 6 17.7858 6 18.5C6 18.7236 6.03976 18.8502 6.09728 18.942C6.15483 19.0338 6.29214 19.1893 6.66219 19.3567C7.45312 19.7145 9.01609 20 12 20C14.9839 20 16.5469 19.7145 17.3378 19.3567C17.7079 19.1893 17.8452 19.0338 17.9027 18.942C17.9602 18.8502 18 18.7236 18 18.5C18 17.7858 17.5982 17.1946 16.5439 16.7264C15.4614 16.2458 13.8722 16 12 16C10.1278 16 8.53857 16.2458 7.45609 16.7264ZM6.64442 14.8986C8.09544 14.2542 10.0062 14 12 14C13.9938 14 15.9046 14.2542 17.3556 14.8986C18.8348 15.5554 20 16.7142 20 18.5C20 18.9667 19.9148 19.4978 19.5973 20.0043C19.2798 20.5106 18.7921 20.8939 18.1622 21.1789C16.9531 21.7259 15.0161 22 12 22C8.98391 22 7.04688 21.7259 5.83781 21.1789C5.20786 20.8939 4.72017 20.5106 4.40272 20.0043C4.08524 19.4978 4 18.9667 4 18.5C4 16.7142 5.16516 15.5554 6.64442 14.8986Z" fill="#0F1729"></path> </g></svg>
                <span style={{ paddingRight: "10px" }}>
                  درباره ما
                </span>
              </Typography>
            </Link>

            <Link to="/" className={Style.text}>
              <Typography className={Style.typo}>
                <img src={icon_contact} alt="icon-contact" style={{ marginBottom: "-5px", width: "24px", height: "24px" }}></img>
                <span style={{ paddingRight: "10px" }}>
                  تماس با ما
                </span>
              </Typography>
            </Link>

            <Link to="/" className={Style.text}>
              <Typography className={Style.typo}>
                <Icon className={Style.text} sx={{ marginBottom: "-5px" }}><Home sx={{ fontSize: "1.5rem" }} /></Icon>
                <span style={{ paddingRight: "10px" }}>
                  کاربران
                </span>
              </Typography>
            </Link>

            <Link to="/" className={Style.text}>
              <Typography className={Style.typo}>
                <Icon className={Style.text} sx={{ marginBottom: "-5px" }}><Home sx={{ fontSize: "1.5rem" }} /></Icon>
                <span style={{ paddingRight: "10px" }}>
                  پنل همکاران
                </span>
              </Typography>
            </Link>

            <Link to="/" className={Style.text}>
              <Typography className={Style.typo}>
                <Icon sx={{ marginBottom: "-8px" }}><ExitToApp></ExitToApp></Icon>
                <span style={{ paddingRight: "10px" }}>
                  ورود | ثبت نام
                </span>
              </Typography>
            </Link>
            
            <Link to="/product" className={Style.text}>
              <Typography className={Style.typo}>
                <Icon sx={{ marginBottom: "-8px" }}><ExitToApp></ExitToApp></Icon>
                <span style={{ paddingRight: "10px" }}>
                  لیست محصولات
                </span>
              </Typography>
            </Link>

            <br />
            <br />
            <Button variant="contained" endIcon={<Close />} className={Style.buttonClose} onClick={toggleDrawer(false)}>
              بستن
            </Button>
          </Box>
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
}