import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import Filters from "../Filters/Filters";
import styles from "./Section.module.css";

export default function Section({ title, data, filterSource, type }) {
  const [filters, setFilters] = useState([{ key: "all", label: "All" }]);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [carouselToggle, setCarouselToggle] = useState(true);

  const handleToggle = () => {
    setCarouselToggle((prevState) => !prevState);
  };

  useEffect(() => {
    if (filterSource) {
      filterSource().then((response) => {
        const { data } = response;
        setFilters([...filters, ...data]);
      });
    }
  }, []);

  const showFilters = filters.length > 1; //true
  const cardsToRender = data.filter((card) =>
    showFilters && selectedFilterIndex !== 0
      ? card.genre.key === filters[selectedFilterIndex].key
      : card
  );
  console.log(data);
  return (
    <div>
      <div className={styles.header}>
        <h3>{title}</h3>
        <h4 className={styles.toggleText} onClick={handleToggle}>
          {!carouselToggle ? "Collapse All" : "Show All"}
        </h4>
      </div>
      {showFilters && (
        <div className={styles.filterWrapper}>
          <Filters
            filters={filters}
            selectedFilterIndex={selectedFilterIndex}
            setSelectedFilterIndex={setSelectedFilterIndex}
          />
        </div>
      )}
      {data.length === 0 ? (
        <CircularProgress />
      ) : (
        <div className={styles.cardsWrapper}>
          {!carouselToggle ? (
            <div className={styles.wrapper}>
              {cardsToRender.map((ele) => (
                <Card data={ele} type={type} />
              ))}
            </div>
          ) : (
            <Carousel
              data={cardsToRender}
              renderComponent={(data) => <Card data={data} type={type} />}
            />
          )}
        </div>
      )}
    </div>
  );
}


// import React, { useState } from "react";
// import styles from "./Section.module.css";
// import Card from "../Card/Card";
// import { CircularProgress } from "@mui/material";
// import Carousel from "../Carousel/Carousel";

// const Section = ({ title, data, type }) => {
//   const [carouselToggle, setCarouselToggle] = useState(true);

//   const handleToggle = () => {
//     setCarouselToggle(!carouselToggle);
//   };
//   return (
//     <div>
//       <div className={styles.header}>
//         <h3>{title}</h3>
//         <h4 className={styles.toggleText} onClick={handleToggle}>
//           {carouselToggle ? "Show All" : "Collapse All"}
//         </h4>
//       </div>
//       {data.length === 0 ? (
//         <CircularProgress />
//       ) : (
//         <div className={styles.cardWrapper}>
//           {!carouselToggle ? (
//             <div className={styles.wrapper}>
//                 {data.map((card) => (
//                 <Card data={card} type={type} key={card.id} />
//                 ))}
//             </div>
//           ) : (
//             <Carousel data={data} renderCardComponent={(data) => <Card data={data} type={type}/>}/>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Section;