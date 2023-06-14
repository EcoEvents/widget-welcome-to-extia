import React, { useRef, useState, useEffect } from 'react'
import './mapBox.css'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Token from .env file
const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN

mapboxgl.accessToken = mapBoxToken

export function MapBox(props) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(2.200551)
  const [lat, setLat] = useState(41.369955)
  const [tripLine] = useState([
    [2.192497, 41.40187],
    [2.192298, 41.402026],
    [2.19183, 41.401674],
    [2.191673, 41.401763],
    [2.191445, 41.401768],
    [2.191384, 41.40173],
    [2.188966, 41.403554],
    [2.188832, 41.40352],
    [2.188642, 41.403261],
    [2.187926, 41.403319],
    [2.187392, 41.402862],
    [2.187231, 41.403015],
    [2.186153, 41.402347],
    [2.183378, 41.404318],
    [2.182498, 41.404994],
    [2.182407, 41.404947],
    [2.182096, 41.404973],
    [2.182032, 41.405046],
    [2.18019, 41.403675],
    [2.180112, 41.403737],
    [2.17985, 41.403752],
    [2.179779, 41.403713],
    [2.179099, 41.404222],
    [2.17906, 41.404181],
    [2.178744, 41.404183],
    [2.178663, 41.404231],
    [2.17801, 41.40374],
    [2.177946, 41.40379],
    [2.177655, 41.403798],
    [2.177595, 41.403753],
    [2.176913, 41.404251],
    [2.176854, 41.404213],
    [2.176517, 41.40422],
    [2.176395, 41.404313],
    [2.176246, 41.404209],
    [2.176203, 41.404244],
    [2.176182, 41.404433],
    [2.175846, 41.404453],
    [2.175758, 41.404572],
  ])
  const [zoom, setZoom] = useState(11)
  const [geoJson, setGeoJson] = useState([])
  const cityArrival = props.cityArrival

  function centerMap(features = null) {
    if (geoJson.length === 0 && !features) {
      return
    }
    features = geoJson.length ? geoJson : features
    var markers = Array.from(document.getElementsByClassName('marker'))
    var markersToHide = markers.filter(
      (marker) => !marker.classList.contains(props.place) && !marker.classList.contains(props.arrivedPlace)
    )
    for (var m of markers) {
      m.style.display = 'block'
    }
    for (var j of markersToHide) {
      j.style.display = 'none'
    }

    var featurePlace = features.find((f) => f.name === props.place)
    var featureArrivedPlace = features.find((f) => f.name === props.arrivedPlace)
    // var featurePlaceCoordinates = featurePlace.geometry.coordinates;
    // var featureArrivedPlaceCoordinates = featureArrivedPlace.geometry.coordinates;
    const featurePlaceCoordinates = [featurePlace.long, featurePlace.lat]
    const featureArrivedPlaceCoordinates = [featureArrivedPlace.long, featureArrivedPlace.lat]

    var bounds = new mapboxgl.LngLatBounds([featurePlaceCoordinates, featureArrivedPlaceCoordinates])
    props.coordinates?.forEach((coord) => {
      bounds.extend(coord)
    })

    map.current.fitBounds(bounds, { padding: 80 })
  }

  useEffect(() => {
    if (!map.current) return
    map.current.flyTo({
      center: [lng, lat],
    })
    // eslint-disable-next-line
  }, [])

  // eslint-disable-next-line
  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mbenkraouda/cl0hwunol001u15p1erz8bof3',
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 15,
      interactive: false,
    })
    if (cityArrival.places) setGeoJson(cityArrival.places)
    for (const place of cityArrival.places) {
      var el = document.createElement('div')
      el.className = 'marker ' + place.name
      new mapboxgl.Marker(el).setLngLat([place.long, place.lat]).addTo(map.current)
    }
    map.current.resize()
    centerMap(cityArrival.places)
  })

  // Set LNG, LAT, ZOOM on map move
  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng)
      setLat(map.current.getCenter().lat)
      setZoom(map.current.getZoom())
    })
  })

  /* const getType = (type) => {
    const trip = `${props.place} - ${props.arrivedPlace}`;
    switch (type) {
      case "bike":
        const geojsonCyclingFilter = geojsonCycling.filter(
          (el) => el.trip === trip
        );
        return (
          geojsonCyclingFilter?.[0]?.cyclingJson?.routes?.[0]?.geometry
            ?.coordinates || []
        );
      case "walk":
        const geojsonWalkingFilter = geojsonWalking.filter(
          (el) => el.trip === trip
        );
        return (
          geojsonWalkingFilter?.[0]?.walkingJson?.routes?.[0]?.geometry
            ?.coordinates || []
        );
      case "driving":
        const geojsonDrivingFilter = geojsonDriving.filter(
          (el) => el.trip === trip
        );
        return (
          geojsonDrivingFilter?.[0]?.drivingJson?.routes?.[0]?.geometry
            ?.coordinates || []
        );
      default:
        const geojson = geojsonWalking.filter((el) => el.trip === trip);
        return (
          geojson?.[0]?.walkingJson?.routes?.[0]?.geometry?.coordinates || []
        );
    }
  };*/

  useEffect(() => {
    centerMap()
    // const { travelType } = props;

    const source = map.current.getSource('LineString')
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              properties: {},
              // coordinates: getType(travelType),
              coordinates: props.coordinates,
            },
          },
        ],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.place, props.arrivedPlace, props.coordinates])

  useEffect(() => {
    map.current.on('load', () => {
      map.current.addSource('LineString', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                properties: {},
                coordinates: tripLine,
              },
            },
          ],
        },
      })
      map.current.addLayer({
        id: 'LineString',
        type: 'line',
        source: 'LineString',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'rgb(253,145,83)',
          'line-width': 5,
        },
      })
    })
    // eslint-disable-next-line
  }, [])

  return (
    <div className="map">
      <div ref={mapContainer} className="map-container"></div>
    </div>
  )
}
