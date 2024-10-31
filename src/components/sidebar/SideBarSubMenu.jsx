import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function SidebarSubmenu({ route }) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const arrowDown = <FontAwesomeIcon icon={faChevronDown} />;
  const arrowRight = <FontAwesomeIcon icon={faChevronRight} />;
  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  }

  return (
    <li className="relative px-6 py-3 mb-10" key={route.name}>
      <button
        className="inline-flex items-center justify-between w-full  font-semibold transition-colors duration-150 hover:underline text-xl"
        onClick={handleDropdownMenuClick}
      >
        <span className="inline-flex items-center">
          <span className="ml-4 text-xl">{route.name}</span>
        </span>
        <span>{isDropdownMenuOpen ? arrowDown : arrowRight}</span>
      </button>

      <ul
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isDropdownMenuOpen ? "p-2 mt-2 bg-erp-deep-green" : "max-h-0"
        } space-y-2  font-medium text-white  shadow-inner `}
        aria-label="submenu"
      >
        {route.routes.map((r) => (
          <>
            <Link className="w-full" to={r.path}>
              <li
                className="px-2 transition-colors duration-150  py-2"
                key={r.name}
              >
                {r.name}
              </li>
            </Link>
          </>
        ))}
      </ul>
    </li>
  );
}

export default SidebarSubmenu;
