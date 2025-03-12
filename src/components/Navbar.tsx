import React, { FunctionComponent } from "react";
import { isMobile as libIsMobile, isTablet as libIsTablet } from "react-device-detect";
let isMobile: Boolean;
if (process.env.NODE_ENV === "localhost") {
  isMobile = window.innerWidth < 1024;
} else {
  isMobile = libIsMobile || libIsTablet || window.innerWidth < 1024;
}
interface NavbarProps {
  window?: () => Window;
}
import logo from "./../assets/img-logo.png";

// Importa los estilos de forma modular
import styles from "../assets/css/style.module.css";

const Navbar: FunctionComponent<NavbarProps> = (props) => {
  return (
    <>
      {/* Usando las clases del CSS modular */}
      <header id={styles.header} className={`${styles["header-sticky"]} ${styles["sticky-active"]}`} data-fullwidth="true">
        <div className={styles["header-inner"]}>
          <div className={styles.container}>
            <div id={styles.logo}>
              <a href="/" className={`${styles["logo"]} ${styles["vcenter"]}`} data-src-dark="/img/img-logo.png" style={{ fontFamily: "Cassannet", fontSize: "16px" }}>
                {/* La imagen también usa estilos modularizados */}
                <img src={logo} alt="Form Builder" style={isMobile ? { marginTop: "7px", display: "inline-block" } : { display: "inline-block" }} className={isMobile ? styles["p-l-20"] : styles["p-r-20"]} />
                Form Builder
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
