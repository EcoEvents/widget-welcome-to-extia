import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SocialMedia } from '../../components/footer/socialMedia/socialMedia'
import { ServicesSection } from './servicesSection'
import { Header } from './header'
import { Link } from 'react-scroll'
// import { cityData } from "./../../data/cityName";
import { useCookies } from 'react-cookie'

import { StickyHeader } from '../../components/stickyHeader/stickyHeader'
import './index.css'
import { EcoEventsSection } from './ecoEventsSection'

const PageContainer = styled.div`
  min-width: 100%;
  height: calc(100% - 80px);
  max-width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`

function Homepage(props) {
  var contentStyle = {}

  var buttonStyle = {
    backgroundPosition: 'center',
    transition: 'background 0.8s',
    borderRadius: '10px',
    border: '0px solid',
    padding: '10px',
    borderColor: 'rgba(40, 61, 71, 0.09)',
    display: 'block',
    margin: '0 auto',
    height: '60px',
    color: 'white',
  }

  // var buttonBCNStyle = {
  //   backgroundPosition: "center",
  //   transition: "background 0.8s",
  //   borderRadius: "10px",
  //   border: "0px solid",
  //   padding: "10px",
  //   borderColor: "rgba(40, 61, 71, 0.09)",
  //   display: "block",
  //   transform: "translateY(-2.5px)",
  //   height: "60px",
  // };

  var headerNavbarContainerStyle = {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '82px',
    zIndex: 3,
    bottom: 0,
    background: '#FC9254',
    boxShadow: 'rgb(0 0 0) 20px 15px 25px',
    borderRadius: '15px 15px 0 0',
    padding: '0px 0px 0px 0px',
  }

  if (props.format !== 'l') {
    contentStyle = {
      marginBottom: '76px',
    }
  }

  const [cities, setCities] = useState([])
  const [cityArrival, setCityArrival] = useState(null)
  const [cityDeparture, setCityDeparture] = useState(null)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`https://ecoevent.up.railway.app/api/v1/cities`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const results = await response.json()
        const second = await results.data
        console.log(second)

        const cities = results.data;

        setCities(cities.sort((a, b) => a.name.localeCompare(b.name)))
        // For the moment, we only have one arrival city
        setCityDeparture(cities.find((cityItem) => cityItem.name === 'Paris'))
        setCityArrival({ name: 'Barcelona', logo: 'https://welcome-to-barcelona.extia.fr/static/media/barcelone.b9eb4b5f5cedd6dcff8f.png', url: "https://welcome-to-barcelona.extia.fr/static/media/barcelone.b9eb4b5f5cedd6dcff8f.png" })
        console.log(cities)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCities()
  }, [])

  const cityChange = (data) => {
    if (data) setCityDeparture(data)
  }

  const [cookies] = useCookies(['GDPRresponse', 'GDPRanalytics', 'GDPRgeoloc'])
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      {[cookies.GDPRresponse === 'true', cookies.GDPRanalytics === 'true', cookies['GDPRgeoloc'] === 'true'] && (
        <>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-JXEF89S4BB"></script>
          <script>dataLayer = window.dataLayer || []</script>
          <script>window.dataLayer.push('js',new Date()); window.dataLayer.push('config', 'G-JXEF89S4BB');</script>
        </>
      )}
      <StickyHeader lngChange={props.lngChange} format={props.format} />
      {props.format === 's' && (
        <div style={headerNavbarContainerStyle}>
          <Link activeClass="active" to="Header" spy={true} style={{ display: 'block' }} offset={-150}>
            <img style={buttonStyle} alt="logo" />
          </Link>
          <Link activeClass="active" to="weather" spy={true} style={{ display: 'block' }} offset={-50}>
            <img style={buttonStyle} src={props.cities.logo} alt="logo" />
          </Link>
          <Link activeClass="active" to="Hackathon" spy={true} offset={props.offset ? props.offset : 0}>
            <img className={buttonStyle} alt="logo" />
          </Link>
        </div>
      )}
      <PageContainer style={contentStyle}>
        <Header
          onChange={cityChange}
          cityDeparture={cityDeparture}
          cityArrival={cityArrival}
          cities={cities}
          lngChange={props.lngChange}
          format={props.format}
          orientation={props.orientation}
        />
        <ServicesSection
          lng={props.lng}
          name="weather"
          cityDeparture={cityDeparture}
          cityArrival={cityArrival}
          format={props.format}
        />
        <EcoEventsSection
          lng={props.lng}
          name="weather"
          cityDeparture={cityDeparture}
          cityArrival={cityArrival}
          format={props.format}
        />
        <SocialMedia lng={props.lng} format={props.format} />
      </PageContainer>
    </>
  )
}

export default Homepage
