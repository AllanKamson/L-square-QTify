import React, { useEffect, useState } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import styles from "./CarouselLeftNavigation.module.css";
import  LeftArrow  from "../../../assets/LeftArrow.svg?react";

export default function CarouselLeftNavigation() {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);

  // useEffect(() => {
  //   // swiper.on("slideChange", function () {
  //   //   setIsBeginning(swiper.isBeginning);
  //   // });
  // }, []);

  swiper.on("slideChange", function () {
    setIsBeginning(swiper.isBeginning);
  });

  return (
    <div className={styles.leftNavigation}>
      {!isBeginning && <LeftArrow onClick={() => swiper.slidePrev()} />}
    </div>
  );
}


// import React from 'react'
// import { useState,useEffect } from 'react'
// import { useSwiper } from 'swiper/react'
// import {ReactComponent as LeftArrow} from '../../../assets/leftArrow.svg'
// import styles from './CarouselLeft.module.css'

// const CarouselLeftNavigation = () => {
//     const swiper = useSwiper();
//     const [isBeginning,setIsBeginning] = useState(swiper.isBeginning)

//     useEffect(() => {
//         swiper.on("slideChange", () => {
//             setIsBeginning(swiper.isBeginning)
//         })
//     },[swiper])
//   return (
//     <div className={styles.leftNavigation}>
//         {!isBeginning && <LeftArrow onClick={() => swiper.slidePrev()}/>}
//     </div>
//   )
// }

// export default CarouselLeftNavigation