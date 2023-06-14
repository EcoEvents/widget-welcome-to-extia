import { useState, useEffect } from "react";
import { t } from "i18next";

import "./scroller.css";

import ScrollerInformation from "./scrollerInformation/scrollerInformation";

export function Scroller(props) {
  const [mouseOver, setMouseOver] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [needClose, setNeedClose] = useState(false);
  const [alreadyLeaved, setAlreadyLeaved] = useState(false);

  const [cityPicto, setCityPicto] = useState(props.cityDeparture);

  useEffect(() => {
    setCityPicto(props?.cityDeparture);
  }, [props.cityDeparture]);

  function mouseEnter() {
    if(!needClose){
      setAnimated(true);
      setMouseOver(true);
    }
    setAlreadyLeaved(false);
    setNeedClose(true);
  }
  function animationEnd() {
     if(alreadyLeaved){
       setMouseOver(false);
       setAlreadyLeaved(false);
     }
     if(!mouseOver){
       setNeedClose(false);
    }
    setAnimated(false);
  }
  function mouseLeave(){
    if(!animated){
      setMouseOver(false);
    }
    else {
      setAlreadyLeaved(true);
    }
  }
  return (
    <>
      <div className="containerNav" 
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onAnimationEnd={animationEnd}>
        <div className={'fixedStyleNav '+ ((animated || mouseOver)? 'animated ' : '')+ ( !animated && !mouseOver && needClose ? 'animatedEnd ' : '')} >
          <nav className='navbar' >
            <ScrollerInformation linkDiv={((animated || mouseOver || needClose)? 'linkdiv ' : 'flexdiv ')}
              sepia=" sepia " imgClassName="button" to="Header"  text={`${t("navbarPlanning")}`} offset={-80}/>
            <ScrollerInformation linkDiv={((animated || mouseOver || needClose)? 'linkdiv ' : 'flexdiv ')} 
              sepia=" sepia " imgClassName="button" to="weather" text={`${t("navbarAreYou")}${t(props.cityDeparture?.name)}`} offset={-40} />
          </nav>
        </div>
      </div>
    </>
  );
}
