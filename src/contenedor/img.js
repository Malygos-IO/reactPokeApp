import React from 'react'
import '../contenedor/img.css';

function img({src}){
    return(
        <div className = "img" >
            <img src = {src} alt = "Pokemon here!"></img>
        </div>
    )
};

export default img;