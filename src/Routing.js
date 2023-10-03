import React from 'react';
import {Route, Routes , BrowserRouter as Router} from 'react-router-dom';
import Home from './View/page/Home.view';
import Product from './View/page/product.view';
import Productp from './View/page/productPage.view';
import Buy from './View/page/buy.view';
import CountProvider from './context';
export default function Routing(){
    return(
        <CountProvider>
        <Router>
            <Routes>
                <Route path='' element={<Home />} />
                <Route path='product' element={<Product />} >
                
                {/* <Route path=":productname" element={<Product />} /> */}
                </Route>
                <Route path='productPage'>
                <Route path=":productPagename" element={<Productp/>}/>
                </Route>
                <Route path='buy' element={<Buy/>}/>
            </Routes>
        </Router>
        </CountProvider>
    );
}