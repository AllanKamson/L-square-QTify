import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";

function Navbar({ searchData }) {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <Logo />
      </Link>
      <Search
        placeholder="Search a song of your choice"
        searchData={searchData}
      />
      <Button>Give Feedback</Button>
    </nav>
  );
}

export default Navbar;


// import React from "react";
// import Button from "../Button/Button";
// import Search from "../Search/Search";
// import styles from './Navbar.module.css'
// import LogoImage from "../../assets/Logo.png"


// export default function Navbar(){
//     return(
//         <>
//             <nav className={styles.navbar}>
//                 <div className={styles.logoDiv}><img  src={LogoImage} alt="logo" width={67}/></div>
//                  <Search search={"Search a song of your choice"}/>
//                 <Button children="Give Feedback"/>
//             </nav>
//         </>
//     )
// }