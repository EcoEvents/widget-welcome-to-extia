import { t } from 'i18next'

import './sides.css'

const RightSide = (props) => {
  const cityArrival = props.cityArrival

  let mainCityDays = []

  mainCityDays = [
    cityArrival?.temperature?.weatherCold,
    cityArrival?.temperature?.weatherMedium,
    cityArrival?.temperature?.weatherHot,
  ]

  return (
    <div className="rightSide">
      <div className="cityInfo">
        <span className="cityText">{cityArrival?.code}</span>
      </div>
      <img className="pictoCity" src={props.cityArrival?.logo?.url} alt="city" />
    </div>
  )
}

export default RightSide
