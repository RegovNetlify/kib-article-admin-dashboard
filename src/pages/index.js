import * as React from "react";

import Layout from "../components/Layout";
import { Catalog } from "../components/catalog";
import { useState } from "react";
import { ARTICLECATALOG } from "../constants";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const CatologIndexPage = ({ data }) => {
  const { allMarkdownRemark: post } = data;
  const isBrowser = typeof window !== "undefined";
  let activeTagState = "";

  useEffect(() => {
    if (isBrowser) {
      activeTagState = sessionStorage.getItem("tag");
      console.log(activeTagState);
    }
    if (isBrowser && activeTagState !== "" && activeTagState) {
      if (activeTagState !== null && activeTagState !== undefined) {
        activeTagState = activeTagState.replaceAll(`"`, "");
        activeTagState = activeTagState.split("/");
        let tempTag = { ...activeTag };
        tempTag = {
          author: activeTagState[1] ? activeTagState[1] : "",
          tag: activeTagState[1] ? activeTagState[1] : "",
          type: parseInt(activeTagState[0]),
        };

        setActiveTag({ ...tempTag });
        console.log(activeTagState);
        console.log(tempTag);
        console.log(activeTag);
        sessionStorage.removeItem("tag");
      }
    } else {
      // console.log("activeTag");
      setActiveTag({
        author: "",
        tag: "",
        type: 0,
      });
    }
    sessionStorage.clear();
  }, []);

  const [articles, setArticle] = useState([
    {
      articleId: 0,
      tags: [],
      type: 1,
      heading: "",
      shortDescription: "",
      date: "",
      author: "",
      slug: "",
    },
  ]);
  const [activeTag, setActiveTag] = useState({
    author: "",
    tag: "",
    type: 0,
  });

  useEffect(() => {
    if (isBrowser) {
      window.scrollTo(0, 0);
    }
  }, []);

  let numActiveArticle = 0;
  articles.map(({ tags }) =>
    tags[0] === activeTag.tag ||
    activeTag.tag === "" ||
    tags[1] === activeTag.tag ||
    tags[3] === activeTag.tag ||
    tags[4] === activeTag.tag ||
    tags[2] === activeTag.tag
      ? numActiveArticle++
      : null
  );
  let tempArticle = [...articles];
  useEffect(() => {
    post.edges.map((edge, index) => {
      tempArticle[index] = {
        articleId: edge.node.id,
        tags: edge.node.frontmatter.tags,
        type: 1,
        heading: edge.node.frontmatter.title,
        shortDescription: edge.node.frontmatter.description,
        date: edge.node.frontmatter.date,
        author: edge.node.frontmatter.author,
        slug: edge.node.fields.slug,
      };
    });
    setArticle([...tempArticle]);
  }, []);

  const [mostRead, setMostRead] = useState([
    {
      heading: "",
      date: "",
      id: 0,
    },
  ]);

  const [tags, setTags] = useState([]);

  const [latest, setLatest] = useState([
    {
      articleId: 0,
      heading: "",
    },
  ]);

  const handleGetArticle = async (tag, type) => {
    let data = {};
    if (tag === "Notice") {
      data["type"] = 2;
    } else {
      if (type) {
        if (type === 1) {
          data["tag"] = tag;
        } else if (type === 2) {
          data["author"] = tag;
        }
      }
    }
    try {
      getMostRead();
    } catch (error) {
      console.log(`error is ${error}`);
    }
  };

  useEffect(() => {
    handleGetArticle();
    getLatest();
    let tempTag = [];
    post.edges.map((edge) => {
      edge.node.frontmatter.tags.map((tag) => {
        if (tempTag.indexOf(tag) < 0) {
          tempTag.push(tag);
        }
      });
    });
    setTags(tempTag);
  }, [activeTag]);

  const getLatest = () => {
    try {
      let tempLatest = [...latest];
      let count = 0;
      for (let index = 0; index < post.edges.length; index++) {
        if (activeTag.tag === "" || activeTag.tag === "Notice") {
          console.log("notice");
          if (
            post.edges[index].node.frontmatter.tags[0] === "Notice" &&
            count < 2
          ) {
            tempLatest[count] = {
              articleId: post.edges[index].node.id,
              heading: post.edges[index].node.frontmatter.title,
              slug: post.edges[index].node.fields.slug,
              tags: post.edges[index].node.frontmatter.tags,
            };
            count = count + 1;
          }
        } else {
          console.log("article");
          if (
            post.edges[index].node.frontmatter.tags[0] !== "Notice" &&
            count < 2
          ) {
            tempLatest[count] = {
              articleId: post.edges[index].node.id,
              heading: post.edges[index].node.frontmatter.title,
              slug: post.edges[index].node.fields.slug,
              tags: post.edges[index].node.frontmatter.tags,
            };
            count = count + 1;
          }
        }
      }
      setLatest([...tempLatest]);
    } catch (error) {}
  };

  const getMostRead = () => {
    let tempData = [];
    for (let index = 0; index < post.edges.length; index++) {
      if (tempData.length < 3) {
        tempData.push({
          heading: post.edges[index].node.frontmatter.title,
          date: post.edges[index].node.frontmatter.date,
          id: post.edges[index].node.id,
          slug: post.edges[index].node.fields.slug,
        });
      } else {
        break;
      }
    }
    setMostRead([...tempData]);
  };

  const articleOnClick = (slug) => {
    window.location.pathname = `${slug}`;
  };

  const selectArticle = (slug) => {
    window.location.pathname = `${slug}`;
  };

  const HandleToogleTag = (tag, type) => {
    console.log(type);
    let baseUrl = "/article";
    if (tag === "") {
      baseUrl = baseUrl;
    } else {
      baseUrl = baseUrl + `/${type ? type : 1}/${tag}`;
    }
    if (isBrowser) {
      window.scroll(0, 0);
      // sessionStorage.setItem("tag", `/${type ? type : 1}/${tag}`);
      let tempTag = { ...activeTag };
      tempTag = {
        author: activeTagState[1] ? activeTagState[1] : "",
        tag: activeTagState[1] ? activeTagState[1] : "",
        type: parseInt(activeTagState[0]),
      };

      setActiveTag({ ...tempTag });
    }
  };

  const handleTag = (tag, type) => {
    handleGetArticle(tag, type);
    setActiveTag({
      author: type === 2 ? tag : "",
      tag: tag,
      type: type,
    });
    getLatest();
    if (isBrowser) {
      window.scrollTo(0, 0);
    }
  };
  return (
    <Layout title="Kenanga Investors">
      <div className="article_wrapper">
        <Catalog
          catalogTitle={ARTICLECATALOG.catalogTitle}
          catalogSubText={`${numActiveArticle} ${ARTICLECATALOG.catalogSubTitle}`}
          numActiveArticle={numActiveArticle}
          catalogSubSubText={ARTICLECATALOG.catalogSubtext}
          catalogImage={ARTICLECATALOG.banner}
          type="Article"
          mostReadTitle={"Latest"}
          mostReadList={mostRead}
          articleCardList={articles}
          tags={tags}
          noticeHeading={
            activeTag.tag === "Notice" || activeTag.tag === ""
              ? ARTICLECATALOG.noticeHeading
              : ARTICLECATALOG.articleHeading
          }
          noticeList={latest}
          handleList={HandleToogleTag}
          handleNotice={articleOnClick}
          handleArticle={selectArticle}
          activeTag={activeTag}
          data={post}
          handleTag={handleTag}
        />
      </div>
    </Layout>
  );
};

CatologIndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default CatologIndexPage;

export const catalogQuery = graphql`
  query CatologIndexPageQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "article-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date
            tags
            author
            description
          }
        }
      }
    }
  }
`;
