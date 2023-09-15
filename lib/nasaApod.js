// import {config} from "../config.js";
// const url = 'https://api.nasa.gov/planetary/apod?api_key='
// const api_key = config.NASA_API_KEY

// const fetchNASAData = async () => {
//   try {
//     const response = await fetch(`${url}${api_key}`);
//     const data = await response.json();
//     console.log("NASA APOD data", data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export async function fetchNASAData;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

import useSWR from "swr";
const url = "https://api.nasa.gov/planetary/apod?api_key=";

export async function NasaPhoto({ params }) {
  //   let data = null;
  //   await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
  //     .then((res) => {
  //       console.log("res", res, res.body);
  //       return res.json();
  //     })
  //     .then((d) => {
  //       data = d;
  //       console.log("NasaPhoto", d);
  //     })
  //     .catch((err) => {
  //       data = null;
  //       console.log("Error", err);
  //     });
  //   let data = await fetch(
  //     `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`
  //   );
  //   let imageDetails = await data.json();
  //   console.log("Nasa imageDetails", imageDetails);
  //   return {
  //     data: imageDetails,
  //   };
  let data = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=5T79VOsmqOidNeSkuRmkbMYzsoJU4i9QT9zsKdnr&date=${params.selectedDate}`
  );
  console.log("data", data);

  let imageDetails = await data.json();

  console.log(
    "imageDetails",
    imageDetails,
    imageDetails.url,
    imageDetails.hdurl
  );

  return {
    props: {
      imageDetails,
    },
  };
}

// export async function Profile() {
//   const { data, error, isLoading } = await useSWR(
//     `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`,
//     fetcher
//   );

//   console.log("Profile", data);
//   return {
//     data: data,
//     isLoading,
//     isError: error,
//   };
// }
