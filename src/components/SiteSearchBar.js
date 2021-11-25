import React, { Fragment, useLayoutEffect, useState, useEffect } from "react";
import { BUTTON, SEARCH_RESULTS } from "../constants";
import { Button } from "./button";

export const SiteSearchBar = ({
  buttonInside,
  handleSearch,
  onClear,
  onEnter,
  onSubmit,
  searchValue,
  visible,
}) => {
  const [size, setSize] = useState([0, 0]);
  //   const useWindowResize = () => {
  // State and setters for window size value

  // useLayoutEffect(() => {
  const isBrowser = typeof window !== "undefined";
  const updateSize = () => {
    if (isBrowser) {
      setSize([window.innerWidth, window.innerHeight]);
    }
  };
  //   window.addEventListener("resize", updateSize);
  //   updateSize();
  //   return () => window.removeEventListener("resize", updateSize);
  // }, []);
  // return size;
  //   };

  useEffect(() => {
    updateSize();
  }, []);
  useEffect(() => {
    if (isBrowser) {
      window.onresize = updateSize;
    }
  }, [size]);
  let width = size[0];
  console.log(width);
  return width > 1024 ? (
    <Fragment>
      <div className="page_content_layout_inner relative">
        <div
          className={`site_search_wrapper ${visible ? "visible" : "hidden"}`}
        >
          <div
            className={
              buttonInside
                ? "site_search_input_wrapper_hidden"
                : "site_search_input_wrapper_visible"
            }
          >
            <input
              className="site_search_input"
              maxLength={255}
              placeholder={"Search here..."}
              onChange={handleSearch}
              value={searchValue}
              onKeyPress={onEnter}
            />
            {searchValue.length !== 0 ? (
              <span className="icon_search" onClick={onClear}>
                x
              </span>
            ) : null}
          </div>
          <Button
            primary
            buttonText="Search"
            icon={BUTTON.primary_image}
            onClick={onSubmit}
          />
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="relative">
        <div
          className={`site_search_wrapper ${
            visible ? "visible" : "hidden"
          } mobile`}
        >
          <div className={"site_search_input_wrapper_hidden"}>
            <input
              className="site_search_input mobile"
              maxLength={255}
              placeholder={"Search here..."}
              onChange={handleSearch}
              value={searchValue}
              onKeyPress={onEnter}
            />
            {searchValue.length !== 0 ? (
              <span className="icon_search fill" onClick={onClear}>
                x
              </span>
            ) : (
              <span className="icon_search" onClick={onClear}>
                x
              </span>
            )}
          </div>
          {/* <Button primary buttonText="Search" icon onClick={onSubmit} /> */}
        </div>
      </div>
    </Fragment>
  );
};

export const ResultsSearchBar = ({
  buttonInside,
  handleSearch,
  onClear,
  onEnter,
  onSubmit,
  searchValue,
}) => {
  const [size, setSize] = useState([0, 0]);
  //   const useWindowResize = () => {
  // State and setters for window size value

  // useLayoutEffect(() => {
  const isBrowser = typeof window !== "undefined";
  const updateSize = () => {
    if (isBrowser) {
      setSize([window.innerWidth, window.innerHeight]);
    }
  };
  //   window.addEventListener("resize", updateSize);
  //   updateSize();
  //   return () => window.removeEventListener("resize", updateSize);
  // }, []);
  // return size;
  //   };

  useEffect(() => {
    updateSize();
  }, []);
  useEffect(() => {
    if (isBrowser) {
      window.onresize = updateSize;
    }
  }, [size]);
  let width = size[0];
  return width > 1024 ? (
    <Fragment>
      <div className="relative_results">
        <div className={`site_search_results_wrapper`}>
          <div
            className={
              buttonInside
                ? "site_search_input_wrapper_hidden"
                : "site_search_input_wrapper_visible"
            }
          >
            <input
              className="site_search_input"
              maxLength={255}
              placeholder={"Search here..."}
              onChange={handleSearch}
              value={searchValue}
              onKeyPress={onEnter}
            />
            {searchValue.length !== 0 ? (
              <span className="icon_search" onClick={onClear}>
                x
              </span>
            ) : null}
          </div>
          <Button
            primary
            buttonText="Search"
            icon={BUTTON.primary_image}
            onClick={onSubmit}
          />
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="relative">
        <div className={`site_search_results_wrapper`}>
          <div
            className={
              buttonInside
                ? "site_search_input_wrapper_hidden"
                : "site_search_input_wrapper_visible results"
            }
          >
            <input
              className="site_search_input"
              maxLength={255}
              placeholder={"Search here..."}
              onChange={handleSearch}
              value={searchValue}
              onKeyPress={onEnter}
            />
            {searchValue.length !== 0 ? (
              <span className="icon_search" onClick={onClear}>
                x
              </span>
            ) : null}
            <Button
              primary
              buttonText="search"
              icon={SEARCH_RESULTS.menu}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
