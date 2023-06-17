import { EcoEventsCarousel } from "../../components/servicesSection/ecoEventsCarousel/ecoEventsCarousel";

function CardEvent(props){
    const name = 

}
export function EcoEventsSection(props) {


    const format = props.format;

    var backgroundStyle = {
        backgroundColor: '#FC9254',
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10px 10px 10px 10px',
    }


    switch (format) {
        case 's':
            
            backgroundStyle = {
                ...backgroundStyle,
                padding: '10px 10px 70px 10px',
            }
            break
        case 'm':
            
            backgroundStyle = {
                ...backgroundStyle,
                padding: '10px 10px 70px 10px',
            }
            break
        case 'l':
            backgroundStyle = {
                ...backgroundStyle,
                padding: '24px 3% 80px 12%',
            }
            break
        default:
            break
    }

    return (
        <div style={backgroundStyle}>
            <EcoEventsCarousel />
        </div>
    )
}

