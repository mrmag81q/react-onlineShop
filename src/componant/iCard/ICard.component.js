import React,{useState} from "react";
import Styles from './ICard.module.scss';
import CloseIcon from '@mui/icons-material/Close'; 
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";

export default function ICard(){
    
    const [Opened, setOpened] = useState(false);

    const open=()=>{
       
        setOpened(!Opened);
    }

    return(
        <div className={Styles.app} style={{ marginTop: 100 }}>
            <div className={Styles.container} >
                <div className={Styles.stay} style={{height: "100%",width: "100%",backgroundColor:"red",position: "absolute"}} >
                    
                    <p>ipsum dolorum caveat emptor veni vidi vici</p>
                    <p>ipsum dolorum caveat emptor veni vidi vici</p>
                    <p>ipsum dolorum caveat emptor veni vidi vici</p>
                    <p>ipsum dolorum caveat emptor veni vidi vici</p>
                    <p>ipsum dolorum caveat emptor veni vidi vici</p>
                </div>

                <div className={Opened?Styles.slided:Styles.slide}>
                {
                    Opened
                    ? <IconButton onClick={open}>
                        <CloseIcon/>
                    </IconButton>
                    :<IconButton onClick={open}>
                        <AddIcon/>
                    </IconButton>

                }
                    <h2>I'm on top</h2>
                </div>
            </div>
        </div>
        
    )
}