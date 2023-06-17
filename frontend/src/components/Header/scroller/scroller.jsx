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
              sepia=" sepia " imgClassName="button" to="Header" logo={'https://welcome-to-barcelona.extia.fr/static/media/thinking.9db96be85ed88789ec771475bcf76663.svg'}  text={`${t("navbarPlanning")}`} offset={-80}/>
            <ScrollerInformation linkDiv={((animated || mouseOver || needClose)? 'linkdiv ' : 'flexdiv ')} 
              sepia=" sepia " imgClassName="button" to="weather" logo={props?.cityDeparture?.logo} text={`${t("navbarAreYou")}${t(props.cityDeparture?.name)}`} offset={-40} />
            <ScrollerInformation linkDiv={((animated || mouseOver || needClose)? 'linkdiv ' : 'flexdiv ')} 
              sepia=" sepia " imgClassName="button" to="weather" logo={'data:image/png;base64,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'} text={`${t("navbarEvents")}${t(props.cityDeparture?.name)}`} offset={1250} />
          </nav>
        </div>
      </div>
    </>
  );
}
