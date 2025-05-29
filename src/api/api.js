import axios from 'axios'

export const BACKEND_ENPOINT = "https://qtify-backend-labs.crio.do";

export const fetchTopAlbums = async() => {
    try{
        const res = await axios.get(`${BACKEND_ENPOINT}/albums/top`);
        console.log(res.data)
        return res.data;
    }catch(error){
        console.error(error)
        
    }
};

export const fetchNewAlbums = async() => {
    try{
        const res = await axios.get(`${BACKEND_ENPOINT}/albums/new`);
        return res.data;
    }
    catch(error){
        console.error(error)
        
    }
};

export const fetchSongs = async() => {
    try{
        const res = await axios.get(`${BACKEND_ENPOINT}/songs`);
        return res.data;
    }
    catch(error){
        console.error(error)
        
    }
};

export const fetchFilters = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/genres`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};