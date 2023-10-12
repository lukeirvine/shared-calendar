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
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const url = "/calendar?url=http://p14-caldav.icloud.com/published/2/MjAyMTg3OTA4MDIwMjE4N8Q6tQ54FIoNO1q9goLDmbm588BFggVh79qzKsIGEXivCQFafUr07Tc3E7PINSAkItOKsVYXJl5oovJwf3huT3Q";
const urlClean = "/calendar?url=http://p14-caldav.icloud.com/published/2/MjAyMTg3OTA4MDIwMjE4N8Q6tQ54FIoNO1q9goLDmbm588BFggVh79qzKsIGEXivCQFafUr07Tc3E7PINSAkItOKsVYXJl5oovJwf3huT3Q&type=CLEANED";

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
    {data && <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700 }}
    />}
  </>
};