import { useEffect, useState } from 'react'


export function EcoEventsCarousel(props) {
    const format = props.format;
    const [events, setEvents] = useState([]);

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
        const getEvents = async () => {
            try {
                const headers = {
                    Authorization: `Bearer J65QQVUTS5O6WFYFRI3A`,
                };
                const response = await fetch('https://www.eventbrite.es/api/v3/destination/events/?event_ids=657437993737,652541448037,464342449767,635964275267,653926651217,600166232357,653161031227,600462508527,656741570717,638005109457,650671976397,652268010177,651116877107,652637254597&page_size=14&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections', headers);
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.events);
                } else {
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };


        // getEvents();


    }, [])

    const testData = ['hola', 'honlas', 'adsfasdfasfd']


    return (
        <div>
            <h2>Haz match con gente como tú</h2>
            <div className="container"></div>
            {testData.map((item) => {
                return <div className="card">
                    <img alt={item.name} src={item.img} className="image_card" />
                </div>
            })}
            <button>ahol</button>
        </div>
    )
}
