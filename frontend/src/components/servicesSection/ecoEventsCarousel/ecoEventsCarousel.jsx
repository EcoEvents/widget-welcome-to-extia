import { useEffect, useState } from 'react'
import './ecoEventsCarousel.css';
import dataEvents from '../../../utilities/dataEvents.json'

export function EcoEventsCarousel(props) {
  const format = props.format
  const [events, setEvents] = useState([])

  switch (format) {
    case 's':
      break
    case 'm':
      break
    case 'l':
      break
    default:
      break
  }

  useEffect(() => {
    setEvents(dataEvents.events.slice(1, 6))
  }, []);
  const handleButtonClick = (url) => {
    window.open(url, '_blank');
  };


  return (
    <div>
      <h2 className="title_section_carousel">Haz <span className='accent_title'>match</span> con gente como tú</h2>
      {events.length === 0 ? (
        <p>Loading events...</p>
      ) : (
        <div className="container">
          {events.map((event) => (
            <div className="card" key={event?.id}>
              <img alt={event?.name.text} src={event.image.original.url} className="image_card" />
              <div className="card_details">
                <h3>{event?.name?.length > 25 ? event.name.slice(0,40)+'...' : event?.name }</h3>
                <p className='card_date'>Date: {event.start_date} </p>
                <p className='card_location'>{event?.primary_venue?.address?.address_1}</p>
                <button className='button_card_carousel' onClick={() => handleButtonClick(event?.url)}>Join</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="circlecarousel" />

    </div>
  );
}