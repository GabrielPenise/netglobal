import React from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";

import style from "../assets/styles/components/Fotter.module.scss";

function Fotter() {
  return (
    <div>
      <div className={style["footer-container"]}>
        <div className={style["footer_menu"]}>
          <div className={style["footer_datos"]}>
            <h3>Developer</h3>
            <div>
              <p>
                <div>Gabriel Penise</div>
                <a href="https://www.linkedin.com">
                  <BsLinkedin />
                </a>
                <a href="https://github.com">
                  <BsGithub />
                </a>
              </p>
              <p>
                <div>Carmela Cacabelos</div>
                <a href="https://www.linkedin.com">
                  <BsLinkedin />
                </a>
                <a href="https://github.com">
                  <BsGithub />
                </a>
              </p>
              <p>
                <div>Gerardo Burgos</div>
                <a href="https://www.linkedin.com">
                  <BsLinkedin />
                </a>
                <a href="https://github.com">
                  <BsGithub />
                </a>
              </p>
              <p>
                <div>Gisela Arroyo Galarce</div>
                <a href="http://linkedin.com">
                  <BsLinkedin />
                </a>
                <a href="https://github.com">
                  <BsGithub />
                </a>
              </p>
              <p>
                <div>Alberto Carrillo de Comas</div>
                <a href="https://www.linkedin.com">
                  <BsLinkedin />
                </a>
                <a href="https://github.com">
                  <BsGithub />
                </a>
              </p>
            </div>
          </div>
        </div>
        <div>
          <p>©Derechos Reservados - 2022</p>
        </div>
      </div>
    </div>
  );
}

export default Fotter;
