import { SelectLangue } from "../../components/Header/selectLangue/selectLangue";
import { Link } from "react-scroll";

import { useEffect, useState } from "react";
import { t } from "i18next";
import "./stickyHeader.scss";
export const StickyHeader = (props) => {
  const stickyNav = {
    height: "80px",
    position: "sticky",
    top: "0",
    left: "0",
    right: "0",
    zIndex: "3",
    backgroundColor: props.format === "s" ? "rgb(255, 233, 221)" : "#ffffff",
    transition: "all 200ms ease-in-out 0ms",
  };

  const stickyNavScrolled = {
    backgroundColor: "rgba(252,146,84, 0.85)",
    backdropFilter: "blur(5px)",
    boxShadow: "-3px 10px 25px rgba(0, 0, 0, 0.25)",
  };

  const extiaLogoContainerStyle = {
    position: "absolute",
    height: "100%",
    top: "0",
    left: props.format === "s" ? "18px" : "calc(2vw + 26px)",
    display: "flex",
    alignItems: "center",
  };

  const extiaLogoStyle = (white) => {
    return {
      borderRadius: "50%",
      boxShadow: "-3px 10px 25px rgba(0, 0, 0, 0.1)",
      height: "60%",
      opacity: isScrolled ^ !white ? "100%" : "0",
      display: isScrolled ^ !white ? "block" : "none",
    };
  };

  const [isScrolled, setIsScrolled] = useState(window.scrollY !== 0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY !== 0);
    });
  }, []);

  return (
    <div
      style={isScrolled ? { ...stickyNav, ...stickyNavScrolled } : stickyNav}
    >
      <Link to="Header" style={extiaLogoContainerStyle}>
        <img
          alt="extia-logo"
          style={extiaLogoStyle(true)}
          src="https://welcome-to-barcelona.extia.fr/static/media/Extialogoblanc.1f626d09ac64a1a1a19be4b42385a487.svg"
        />
      </Link>
      <div className="divheaderhackathon">
        <div className={isScrolled?"seconddiv whiteDiv ":"seconddiv"}>
          <Link to="#" >
            {t("hackathonWellDone")}
          </Link>
        </div>
      </div>
      

      <SelectLangue onClick={props.lngChange} isWhite={isScrolled} />
    </div>
  );
};
