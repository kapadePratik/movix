import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3/";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTdhNjQ4YWU5NTA1NTY5NWQ0NzA4MGI0ZGRiMTY3MSIsInN1YiI6IjY0ZDYyZjNhZGI0ZWQ2MDBjNTYwN2U3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CnxJUIZqTl5JRp7VS4nw57AKXIdboglOHwjB7TxTasI";

const headers ={
    Authorization: "bearer " +
      TMDB_TOKEN,
}

export const fetchDataFromApi = async(url, params) => {
  try {
    const {data} = await axios.get
    (BASE_URL + url, {
        headers,
        params
    })
      return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}