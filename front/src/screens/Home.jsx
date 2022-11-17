import React from 'react';
import style from "../assets/styles/screens/Home.module.scss";
import imagen from "../assets/styles/image/gris_cuadrado.png";


function Home() {
  return ( 
    <div>
    <div className={style["conatinerHome"]}>
    <div>
    <img className={style["imagenHome"]} src={imagen}/>
    </div>
    <div className={style["tituloHome"]}>
   <h3 >Bienvenido Fravega!</h3>
   </div>
   </div>
   </div>
  )
}

export default Home