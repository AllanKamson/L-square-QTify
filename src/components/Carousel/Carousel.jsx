import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation} from "swiper/modules";
import { useSwiper } from "swiper/react";
import styles from "./Carousel.module.css";
import "swiper/css";
import CarouselLeftNavigation from "./CarouselLeftNavigation/CarouselLeftNavigation";
import CarouselRightNavigation from "./CarouselRightNavigation/CarouselRightNavigation";

const Controls = ({ data }) => {
  const swiper = useSwiper();

  useEffect(() => {
    swiper.slideTo(0);
  }, [data]);

  return <></>;
};

function Carousel({ data, renderComponent }) {
  return (
    <div className={styles.wrapper}>
      <Swiper
        style={{ padding: "0px 20px" }}
        initialSlide={0}
        modules={[Navigation]}
        slidesPerView={"auto"}
        spaceBetween={40}
        allowTouchMove
      >
        <Controls data={data} />
        <div>
          <CarouselLeftNavigation />
          <CarouselRightNavigation />
        </div>
        {data.map((ele) => (
          <SwiperSlide>{renderComponent(ele)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;


// import React, { useEffect } from 'react'
// import 'swiper/css'
// import {Navigation} from 'swiper/modules'
// import {Swiper,useSwiper,SwiperSlide} from 'swiper/react'
// import styles from './Carousel.module.css'
// import CarouselLeft from './CarouselLeft/CarouselLeft'
// import CarouselRight from './CarouselRight/CarouselRight'

// const Controls = ({data}) => {
//     let swiper = useSwiper();
//     console.log(swiper)
//     useEffect(() => {
//         // swiper.slideTo(0)
//     },[data])

//     return <></>
// }

// const Carousel = ({data,renderCardComponent}) => {
//   return (
//     <div className={styles.wrapper}>
//         <Swiper initialSlide = {0} modules={{Navigation}} slidesPerView={'auto'} spaceBetween={40} allowTouchMove>
//             <Controls data={data} />
//             <CarouselLeft />
//             <CarouselRight />
//             {data.map(item => (
//                 <SwiperSlide>{renderCardComponent(item)}</SwiperSlide>
//             ))}
//         </Swiper>
//     </div>
//   )
// }

// export default Carousel