import { useState } from "react";
import Image from "next/image";
import { NasaPhoto } from "../lib/nasaApod.js";
import Layout from "../components/layout.js";
// import Date from "../components/date";
import DatePickerComponent from "../components/datePicker.js";
import { parseISO, format } from "date-fns";

export async function getServerSideProps({ params }) {
  let data = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=5T79VOsmqOidNeSkuRmkbMYzsoJU4i9QT9zsKdnr&date=2023-09-07`
  );

  let imageDetails = await data.json();

  return {
    props: {
      imageDetails,
    },
  };
}

export default function Avatar({ imageDetails }) {
  const today = new Date();
  const initialDate = format(today, "yyyy-MM-dd");

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const [image, setImage] = useState();

  async function handleSelectedDate(dateString) {
    setSelectedDate(format(parseISO(dateString), "yyyy-MM-dd"));

    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=5T79VOsmqOidNeSkuRmkbMYzsoJU4i9QT9zsKdnr&date=${selectedDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setImage(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return image ? (
    <Layout>
      <label className="display-block">Select Date</label>
      <DatePickerComponent
        selectedDate={selectedDate}
        handleSelectedDate={handleSelectedDate}
      />
      <h2>{image.title}</h2>
      <div className="position-relative">
        <Image
          src={image?.url}
          fill={true}
          objectFit="cover"
          layout="fill"
          className="position-relative"
          alt="Your Name"
        />
      </div>

      <section className="">{image.explanation}</section>
      <p>By {image.copyright}</p>
      <p>{format(parseISO(selectedDate), "LLLL d, yyyy")}</p>
    </Layout>
  ) : (
    <Layout>
      <label className="display-block">Select Date</label>
      <DatePickerComponent
        selectedDate={selectedDate}
        handleSelectedDate={handleSelectedDate}
      />
      <h2>{imageDetails.title}</h2>
      <div className="position-relative">
        <Image
          src={imageDetails?.url}
          fill={true}
          objectFit="cover"
          layout="fill"
          className="position-relative"
          // height={384} // Desired size with correct aspect ratio
          // width={288} // Desired size with correct aspect ratio
          alt="Your Name"
        />
      </div>

      <section className="">{imageDetails.explanation}</section>
      <p>By {imageDetails.copyright}</p>
      <p>{format(parseISO(selectedDate), "LLLL d, yyyy")}</p>
    </Layout>
  );
}
