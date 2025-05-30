import React, { useEffect, useState } from "react";
import Hero from "./components/Hero/Hero";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Faq from "./components/Faq/Faq";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import StyledEngineProvider from "@mui/styled-engine/StyledEngineProvider";
import { Outlet } from "react-router-dom";
import {
  fetchFilters,
  fetchNewAlbums,
  fetchSongs,
  fetchTopAlbums,
} from "./api/api";

function App() {
  const [data, setData] = useState({});

  // const r = {
  //   topAlbums: [{}, {}, {}, {}],
  //    newAlbums: [{}, {}, {}, {}],
  //    genres: ['rock', 'pop', 'jazz'],
  //    songs: []
  // };

  const generateData = (key, source) => {
    source().then((data) => {
      setData((prevState) => {
        // Object.assign would also work
        return { ...prevState, [key]: data };
      });
    });
  };

  useEffect(() => {
    generateData("topAlbums", fetchTopAlbums);
    generateData("newAlbums", fetchNewAlbums);
    generateData("songs", fetchSongs);
    generateData("genres", fetchFilters);
  }, []);

  const { topAlbums = [], newAlbums = [], songs = [], genres = [] } = data;

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Navbar searchData={[...topAlbums, ...newAlbums]} />
        <Outlet context={{ data: { topAlbums, newAlbums, songs, genres } }} />
        <Faq />
        <AudioPlayer />
      </StyledEngineProvider>
    </>
  );
}

// {data: {
//   topAlbums: [],
//   newAlbums: [],
//   genres: [],
//   songs: []
// }}

export default App;


// // import React from 'react'
// import Navbar from './components/Navbar/Navbar.jsx'
// // import Hero from './components/Hero/Hero.jsx'
// // import styles from './App.module.css'
// import React, { useEffect, useState } from 'react'
// import { fetchTopAlbums, fetchNewAlbums, fetchSongs, fetchFilters } from './api/api'
// // import Section from './components/Section/Section.jsx'
// // import FilterSection from './components/FilterSection/FilterSection'
// import StyledEngineProvider from "@mui/material/StyledEngineProvider";
// import { Outlet } from "react-router-dom";


// function App() {

//   const [topAlbumSongs, setTopAlbumSongs] = useState([])
//   const [newAlbumSongs, setNewAlbumSongs] = useState([])
  
//   const [filteredDataValues, setFilteredDataValues] = useState([''])
//   const [toggle, setToggle] = useState(false)
//   const [value, setValue] = useState(0);

//   const generateSongsData = (value) => {
//     let songData = newAlbumSongs[0].songs;
//     let key;
//     if (value === 0) {
//       setFilteredDataValues(songData)
//       return;
//     }
//     else if (value === 1) {
//       key = 'rock'
//     }
//     else if (value === 2) {
//       key = 'pop'
//     }
//     else if (value === 3) {
//       key = 'jazz'
//     }
//     else if (value === 4) {
//       key = 'blues'
//     }
//     const data = songData.filter((item) => {
//       return item.genre.key === key
//     })
//     setFilteredDataValues(data)
//   }

//   const handleChange = (event, newValue) => {
//     setValue(newValue)
//     generateSongsData(newValue)
//   }
//   const handleToggle = () => {
//     setToggle(!toggle)
//   }

//   const filteredData = (val) => {
//     generateSongsData(val)
//     // console.log(val + ' filteredData is called from app.js')
//   }

//   const generateTopAlbumSongs = async () => {
//     try {
//       const topAlbumSongs = await fetchTopAlbums()
//       setTopAlbumSongs(topAlbumSongs)
//     }
//     catch (error) {
//       console.log(error)
//       return null
//     }

//   }
//   const generateNewAlbumSongs = async () => {
//     try {
//       const newAlbumSongs = await fetchNewAlbums()
//       setNewAlbumSongs(newAlbumSongs);
//       // setFilteredDataValues(newAlbumSongs);
//     }
//     catch (error) {
//       console.log(error)
//       return null
//     }
//   }

//   const generateFilterSongs = async () => {
//     try {
//       const newAlbumSongs = await fetchSongs()
//       // setNewAlbumSongs(newAlbumSongs);
//       setFilteredDataValues(newAlbumSongs);
//     }
//     catch (error) {
//       console.log(error)
//       return null
//     }
//   }

//   useEffect(() => {
//     // eslint-disable-next-line
//   }, [value])

//   useEffect(() => {
//     generateData("topAlbums", fetchTopAlbums);
//     generateData("newAlbums", fetchNewAlbums);
//     generateData("songs", fetchSongs);
//     generateData("genres", fetchFilters);
//   }, []);

//   const { topAlbums = [], newAlbums = [], songs = [], genres = [] } = data;
  
  
//   return (
//     <>
//       <StyledEngineProvider injectFirst>
//         <Navbar searchData={[...topAlbums, ...newAlbums]} />
//         <Outlet context={{ data: { topAlbums, newAlbums, songs, genres } }} />
//       </StyledEngineProvider>
//     </>
//   );
// }

// export default App