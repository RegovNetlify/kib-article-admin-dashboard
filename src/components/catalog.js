import React from "react";
import { useEffect, useState } from "react";
import {
  AnnouncementCard,
  ArticleCard,
  Banner,
  BreadCrumb,
  MostReadList,
} from ".";

import { FeaturedCard } from ".";

import { ARTICLECATALOG, CATALOG, FEATUREARTICLE } from "../constants";

export const Catalog = (props) => {
  // let history = useHistory()
  // const [activeTag, setActiveTage] = useState({
  //   tag:"",
  //   type:1
  // })
  const [size, setSize] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false);
  //   const useWindowResize = () => {
  // State and setters for window size value

  // useLayoutEffect(() => {
  const isBrowser = typeof window !== "undefined";
  const updateSize = () => {
    if (isBrowser) {
      setSize([window.innerWidth, window.innerHeight]);
      if (size[0] < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  };

  useEffect(() => {
    if (isBrowser) {
      updateSize();
    }
  }, []);
  //   window.addEventListener("resize", updateSize);
  //   updateSize();
  //   return () => window.removeEventListener("resize", updateSize);
  // }, []);
  // return size;
  //   };

  if (isBrowser) {
    window.onresize = updateSize;
  }
  useEffect(() => {
    if (isBrowser) {
      window.onresize = updateSize;
    }
    if (size[0] < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [size]);
  const [catalogLimit, setCatalogLimit] = useState(
    isMobile ? 4 : CATALOG.limit
  );
  const [featured, setFeatured] = useState({
    id: 0,
    maintext: "",
    mainTitle: "",
  });

  const handleMore = () => {
    if (catalogLimit === props.articleCardList.length) {
      setCatalogLimit(CATALOG.limit);
    } else {
      setCatalogLimit(props.articleCardList.length);
    }
  };

  const handleToggleTab = (tag, type) => {
    // setActiveTage({
    //   tag:tag,
    //   type:type
    // })
    if (props.handleList) {
      props.handleList(tag, type);
    }
    // document.body.scrollTop = 0
    // document.documentElement.scrollTop = 0
  };

  const handleNotice = (index) => {
    // history.push("/SingleArticleNotice")
    if (props.handleNotice) {
      window.scrollTo(0, 0);
      props.handleNotice(index);
    }
  };

  useEffect(() => {
    if (props.articleCardList.find((d) => d.type === 1)) {
      setFeatured({
        id: props.articleCardList.find((d) => d.type === 1)?.articleId,
        mainTitle: props.articleCardList.find((d) => d.type === 1)?.heading,
        maintext: props.articleCardList.find((d) => d.type === 1)
          ?.shortDescription,
      });
    }
  }, [props.articleCardList]);
  console.log(isMobile);
  console.log(size);

  return (
    <div>
      {/* {activeTag === "" && (
        <img className="catalog-banner" src={props.catalogImage} alt={props.catalogImage} />
      )} */}
      {!isMobile && (
        <Banner height={`auto`} img={isMobile ? "" : props.catalogImage}>
          <div className="catalog-banner-text">
            <p className="catalog-banner-title">{"Articles"}</p>
            <p className="catalog-banner-sub-title">
              {ARTICLECATALOG.bannerPara}
            </p>
          </div>
        </Banner>
      )}
      <div className="catalog-wrapper">
        {!isMobile && (
          <div className="catalog-breadcrumb">
            <BreadCrumb
              pathName={`/Home/Articles${
                props.activeTag.tag === ""
                  ? ""
                  : `${props.activeTag.type === 1 ? `/Categories` : "/Author"}`
              }`}
            />
          </div>
        )}

        {isMobile && (
          <div className="catalog_section">
            <div className="catalog-breadcrumb">
              <BreadCrumb
                pathName={`/Home/Articles${
                  props.activeTag.tag === ""
                    ? ""
                    : `${
                        props.activeTag.type === 1 ? `/Categories` : "/Author"
                      }`
                }`}
              />
            </div>
            <p className="catalog-banner-title">{"Articles"}</p>
          </div>
        )}

        {props.activeTag.tag === "" ? (
          <div className="catalog-featured">
            <div className="catalog-main-featured catalog_non_ash">
              {props.type === "Article" && (
                <FeaturedCard
                  title={FEATUREARTICLE.title}
                  image={FEATUREARTICLE.img}
                  mainTitle={featured.mainTitle}
                  maintext={featured.maintext}
                  id={featured.id}
                />
              )}
            </div>
            <div className="catalog-sub-featured catalog_section">
              {props.type === "Article" && (
                <MostReadList
                  title={props.mostReadTitle}
                  list={props.mostReadList}
                  onSelect={props.handleArticle}
                />
              )}
            </div>
          </div>
        ) : null}

        <div className="catalog-list-warpper catalog_non_ash">
          <p>
            <span className="catalog-list-title">{`${
              props.activeTag.tag === ""
                ? props.catalogTitle
                : props.activeTag.tag
            }`}</span>{" "}
            <span className="catalog_list_info_text">
              <span className="catalog-list-sub-title">
                {props.catalogSubText}
              </span>{" "}
              <span>{props.catalogSubSubText}</span>
            </span>
          </p>
          <div>
            <div
              className={`catalog-tag-wrapper ${
                props.activeTag.type !== 2 ? "" : "close"
              }`}
            >
              <div
                onClick={() => {
                  handleToggleTab("", 1);
                }}
                className={`catalog-tags ${
                  props.activeTag.tag === "" ? "active" : ""
                } cursor_pointer`}
              >
                <b>All</b>
              </div>
              {props.tags.map((tag) => {
                return (
                  <div
                    onClick={() => {
                      handleToggleTab(tag, 1);
                    }}
                    className={`catalog-tags ${
                      props.activeTag.tag === tag ? "active" : ""
                    } cursor_pointer`}
                  >
                    <b>{tag}</b>
                  </div>
                );
              })}
            </div>
            <img src={""} alt={""} />
          </div>
          <div className="catalog-card-list-container">
            {props.articleCardList.slice(0, catalogLimit).map((articleCard) => {
              return (
                <ArticleCard
                  articleId={articleCard.articleId}
                  tags={articleCard.tags}
                  heading={articleCard.heading}
                  date={articleCard.date}
                  author={articleCard.author}
                  shortDescription={articleCard.shortDescription}
                  setTag={handleToggleTab}
                  notice={articleCard.type === 2}
                />
              );
            })}
          </div>
          {props.articleCardList.length > CATALOG.limit && (
            <div className="catalog-button-wrapper">
              <button className="catalog-loadmore" onClick={handleMore}>
                Load More +
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="catalog-notices-wrapper ash">
        <p className="catalog-notices-header">{props.noticeHeading}</p>
        <div className="catalog-notice-list">
          {props.noticeList.map((notice) => {
            return (
              <AnnouncementCard
                onClick={() => handleNotice(notice.articleId)}
                secondary
                // tag={notice.tags}
                // heading= {notice.heading}
                main={notice.heading}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
