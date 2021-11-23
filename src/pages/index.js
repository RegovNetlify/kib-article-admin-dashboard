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
  if (isBrowser) {
    activeTagState = localStorage.getItem("tag");
  }
  useEffect(() => {
    if (isBrowser) {
      if (
        activeTagState !== null &&
        activeTagState !== undefined &&
        activeTagState
      ) {
        setActiveTag({
          author: "",
          tag: JSON.parse(activeTagState),
          type: 1,
        });
      }
      localStorage.clear();
    } else {
      setActiveTag({
        author: "",
        tag: "",
        type: 0,
      });
    }
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
    },
  ]);
  const [activeTag, setActiveTag] = useState({
    author: "",
    tag: "",
    type: 0,
  });

  let numActiveArticle = 0;
  articles.map(({ tags }) =>
    tags[0] === activeTag.tag || activeTag.tag === ""
      ? numActiveArticle++
      : null
  );
  let tempArticle = [...articles];
  useEffect(() => {
    post.edges.map((edge, index) => {
      // console.log(edge);
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

  //   let { typeParam, tagParam } = useParams();

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
    if (tag === "Notices") {
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

    // let response = await getArticleList(data);
    try {
      // console.log(response);
      // console.log('====================================');
      // console.log(`data = ${JSON.stringify(data)} from tags ${JSON.stringify(response?.data['articles'])}`);
      // console.log('====================================');
      // setArticle(response?.data["articles"]);
      getMostRead();
      // console.log(`tags from backend ${response?.data["tags"]}`);
    } catch (error) {
      console.log(`error is ${error}`);
    }
  };

  useEffect(() => {
    handleGetArticle();
    getLatest();
    let tempTag = [];
    post.edges.map((edge) => {
      // console.log(edge);
      edge.node.frontmatter.tags.map((tag) => {
        if (tempTag.indexOf(tag) < 0) {
          console.log(tag);
          console.log(tempTag);
          tempTag.push(tag);
        }
      });
    });
    setTags(tempTag);
  }, []);

  const getLatest = async () => {
    try {
      // let tempNotices = await getLatestNotice();
      // console.log(`notices === ${JSON.stringify(tempNotices?.data)}`)
      // setLatest(tempNotices?.data);

      console.log(post.edges[0].node);

      let tempLatest = [...latest];
      let count = 0;
      for (let index = 0; index < post.edges.length; index++) {
        if (post.edges[index].node.frontmatter.tags[0] === "Notice") {
          tempLatest[count] = {
            articleId: post.edges[index].node.id,
            heading: post.edges[index].node.frontmatter.title,
            slug: post.edges[index].node.fields.slug,
          };
          count = count + 1;
        }
      }

      setLatest([...tempLatest]);
    } catch (error) {}
  };

  const getMostRead = () => {
    let tempData = [];
    // let counter = 0;
    // data.forEach((card) => {
    //   if (counter < 3) {
    //     if (card.type === 1) {
    //       tempData.push({
    //         heading: card.heading,
    //         date: card.date,
    //         id: card.articleId,
    //       });
    //       counter = counter + 1;
    //     }
    //   }
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
      window.localStorage.setItem("tag", `/${type ? type : 1}/${tag}`);
    }
    // history.push(baseUrl);
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
          catalogSubSubText={ARTICLECATALOG.catalogSubtext}
          catalogImage={ARTICLECATALOG.banner}
          type="Article"
          mostReadTitle={"Latest"}
          mostReadList={mostRead}
          articleCardList={articles}
          tags={tags}
          noticeHeading={ARTICLECATALOG.noticeHeading}
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
            date(formatString: "MMMM DD, YYYY")
            tags
            author
            description
          }
        }
      }
    }
  }
`;
