import React, { useRef } from "react";
import sublinks from "./data";
import { useGlobalContext } from "./context";

const Submenu = () => {
  const { pageId, setPageId } = useGlobalContext();
  const currentPage = sublinks.find((item) => item.pageId === pageId);

  const submenuContainer = useRef(null);
  const handleOnMouseLeave = (event) => {
    const submenu = submenuContainer.current;
    const { clientX, clientY } = event;
    const { left, right, bottom } = submenu.getBoundingClientRect();
    if (clientX < left - 1 || clientX > right - 1 || clientY > bottom) {
      setPageId(null);
    }
  };
  return (
    <div
      className={currentPage ? "submenu show-submenu" : "submenu"}
      onMouseLeave={handleOnMouseLeave}
      ref={submenuContainer}
    >
      <h5>{currentPage?.page}</h5>
      <div
        className="submenu-links"
        style={{
          gridTemplateColumns:
            currentPage?.links?.length > 3 ? "1fr 1fr" : "1fr",
        }}
      >
        {currentPage?.links?.map((link) => {
          const { id, url, label, icon } = link;
          return (
            <a href={url} key={id}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Submenu;
