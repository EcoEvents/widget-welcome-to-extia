import { Link } from "react-scroll";
import "./goDownArrow.css";

// General scroll to element function

export const GoDownArrow = (props) => {
  return (
    <Link className="arrowImg" activeClass="active" to="weather" spy={true} offset={-50}>
    </Link>
  );
};
