/*
  This code created by Luke Irvine Developments
  
  Copyright 2023. All Rights Reserved.
  
  Created By: Luke Irvine
  
  Homepage.js
*/

import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import styles from "./Homepage.module.css"
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Spinner } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

const url = "/calendar?url=http://p14-caldav.icloud.com/published/2/MjAyMTg3OTA4MDIwMjE4N8Q6tQ54FIoNO1q9goLDmbm588BFggVh79qzKsIGEXivCQFafUr07Tc3E7PINSAkItOKsVYXJl5oovJwf3huT3Q";
let urlClean = "/calendar?url=http://p14-caldav.icloud.com/published/2/MjAyMTg3OTA4MDIwMjE4N8Q6tQ54FIoNO1q9goLDmbm588BFggVh79qzKsIGEXivCQFafUr07Tc3E7PINSAkItOKsVYXJl5oovJwf3huT3Q&type=recurring";
// this variable will force the dev app to use the production server
const USE_PROD_SERV = true;
if (window.location.hostname !== "localhost" || USE_PROD_SERV) {
  urlClean = "http://cgi.mixflip.io:3000" + urlClean;
}

export default function Homepage(props) {

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        fetch(urlClean).then(response => {
          console.log("RESPONSE", response);
          return response.json()
        }).then(data => {
          data.forEach((_, i) => {
            data[i].start = new Date(data[i].start);
            data[i].end = new Date(data[i].end);
          })
          console.log("DATA", data);
          setData(data);
        })
      } catch (error) {
        console.error("Error fetchingdata:", error);
      }
    })();
  }, []);

  return <>
    <h1 className={styles.header}>Luke's Availability</h1>
    {data && <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      min={new Date().setHours(8, 0, 0)}
      max={new Date().setHours(22, 0, 0)}
      drilldownView="week"
      style={{ height: 600 }}
    />}
    {!data && <div className={styles.loadingContainer}>
      <Spinner className={styles.spinner} size="lg" animation="grow" variant="secondary"/>
      <Spinner className={styles.spinner} size="lg" animation="grow" variant="secondary"/>
      <Spinner className={styles.spinner} size="lg" animation="grow" variant="secondary"/>
    </div>}
  </>
};