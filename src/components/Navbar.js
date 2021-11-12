import React from "react"
import {Fragment, useState} from "react"
import {useHistory} from "react-router-dom"

import {siteSearch} from "../api"
import {LoginCardData, NAVBAR} from "../constants"
import {LoginCard} from "./logInCard"
import {Dropdown} from "./dropdown"
import {Modal} from "./modal"
import {SiteSearchBar} from "./SiteSearchBar"


export const NavBar = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  

  let history = useHistory()
  const openLogin = () => {
    setShowModal(true)
  }
  const closeLogin = () => {
    setShowModal(false)
  }
  const handleSearch = (e) => {
    console.log(e.currentTarget.value, "ddf")
    setSearchValue(e.currentTarget.value)
  }
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      onSite_Search(e.currentTarget.value)
    }
  }
  const handleClearSearch = () => {
    setSearchValue("")
  }
  const onSite_Search = async (input) => {
    const response = await siteSearch(input, 0)
    console.log("data", response?.data)
    const searchResults = {key: input, result: response?.data.searchData}
    setShowSearch(false)
  
    // handleScrollToTop();
    history.push(`/search-results`, searchResults)
  }
  const handleScrollToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
  return (
    <Fragment>
      <div className="border navbar flex_row_vertical_center">
        <div className="navbar_logo_container" style={{marginRight: "45px"}}>
          <a href="/">
            <img src={NAVBAR.logo} alt={NAVBAR.logo} className="navbar_logo cursor_pointer" />
          </a>
        </div>
        {/* {NAVBAR.tabs.map(({label, tabs, links}, index) => (
          <div key={"navbar tab" + index} className="navbar_tabs">
            <Dropdown label={label} options={tabs} active={!showModal} links={links} />
          </div>
        ))} */}
        {NAVBAR.tabs.map(({label, tabs }, index) => (
          <div key={"navbar tab" + index} className="navbar_tabs">
            <Dropdown label={label} options={tabs} active={!showModal} />
          </div>
        ))}

      
        <div className="solotab_dropdown_label">
          <a className="solotab_dropdown_label" href={NAVBAR.solotab.links2}>Choice of Profession</a>
        </div>
        <div className="flex_grow" />

        <img
          src={NAVBAR.search}
          alt={NAVBAR.search}
          className="navbar_search"
          onClick={() => {
            setShowSearch(!showSearch)
          }}
        />
        <div className="navbar_swap">
        <img
          src={NAVBAR.eAccess}
          alt={NAVBAR.eAccess}
          className="navbar_access navbar_access_hide"
          // onClick={openLogin}
        />
        <img
          src={NAVBAR.eAccess_hover}
          alt={NAVBAR.eAccess_hover}
          className="navbar_access navbar_access_show"
          onClick={openLogin}
        />
        </div>
        
        <Modal open={showModal} paddingTop="0" closeModal={closeLogin}>
          <LoginCard
            main={LoginCardData.main}
            sub={LoginCardData.sub}
            buttonText={LoginCardData.buttonText}
            visitCard={LoginCardData.visitCard}
          />
        </Modal>
      </div>
      <SiteSearchBar
        searchValue={searchValue}
        handleSearch={handleSearch}
        onEnter={handleEnterKeyPress}
        visible={showSearch}
        buttonInside
        onSubmit={() => onSite_Search(searchValue)}
        onClear={() => handleClearSearch()}
      />
    </Fragment>
  )
}
function setOpen(arg0) {
  throw new Error("Function not implemented.")
}

