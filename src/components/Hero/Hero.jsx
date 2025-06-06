import React from "react";
import styles from "./Hero.module.css";
import VibratingHeadphone from "../../assets/vibrating-headphone.png";

function Hero() {
  return (
    <div className={styles.hero}>
      <div>
        <h1>100 Thousand Songs, ad-free</h1>
        <h1>Over thousands podcast episodes</h1>
      </div>
      <div>
        <img
          src={VibratingHeadphone}
          width={212}
          alt="headphones"
        />
      </div>
    </div>
  );
}

export default Hero;


// import React from 'react'
// import HeroImage from '../../assets/vibrating-headphone.png'
// import styles from './Hero.module.css'
// const Hero = () => {
//   return (
//     <>  
//         <section className={styles.Hero}>
//             <div className={styles.HeroTitle}>
//                 <h1>100 Thousand Songs, ad-free</h1>
//                 <h1>Over thousands podcast episodes</h1>
//             </div>
//                 <img className={styles.HeroImage} src={HeroImage} alt='headphone'/>
//         </section>
//     </>
//   )
// }

// export default Hero