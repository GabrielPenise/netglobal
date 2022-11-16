import React from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";

import style from "../assets/styles/components/Fotter.module.scss";

function Fotter() {
  return (
    <div>
      {" "}
      <div className={style["footer-container"]}>
        <div className="footer_menu">
          <div className="footer_datos">
            <h3>Developer</h3>
            <div>
              <p>
                <div>1</div>
                <a href="https://www.linkedin.com">
                  <BsLinkedin />
                </a>
                <a href="https://github.com">
                  <BsGithub />
                </a>
              </p>
              <p>
                <div>2</div>
                <a href="https://www.linkedin.com">
                  <BsLinkedin />
                </a>
                <a href="https://github.com">
                  <BsGithub />
                </a>
              </p>
              <p>
                <div>3</div>
                <a href="https://www.linkedin.com">
                  <BsLinkedin />
                </a>
                <a href="https://github.com">
                  <BsGithub />
                </a>
              </p>
              <p>
                <div>4</div>
                <a href="http://linkedin.com">
                  <BsLinkedin />
                </a>
                <a href="https://github.com">
                  <BsGithub />
                </a>
              </p>
              <p>
                <div>5</div>
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
