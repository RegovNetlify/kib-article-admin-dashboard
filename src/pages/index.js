import * as React from "react";

import Layout from "../components/Layout";
import { Catalog } from "../components/catalog";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getArticleList, getLatestNotice } from "../api";
import { ARTICLECATALOG } from "../constants";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const CatologIndexPage = ({ data }) => {
  const { allMarkdownRemark: post } = data;
  const isBrowser = typeof window !== "undefined";
  let history = useHistory();
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

  const [activeTag, setActiveTag] = useState({
    tag: "",
    type: 0,
  });

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

    let response = await getArticleList(data);
    try {
      console.log(response);
      // console.log('====================================');
      // console.log(`data = ${JSON.stringify(data)} from tags ${JSON.stringify(response?.data['articles'])}`);
      // console.log('====================================');
      // setArticle(response?.data["articles"]);
      getMostRead(response?.data["articles"]);
      console.log(`tags from backend ${response?.data["tags"]}`);
    } catch (error) {
      console.log(`error is ${error}`);
    }
  };

  useEffect(() => {
    handleGetArticle();
    getLatest();
    setTags(post.edges[0].node.frontmatter.tags);
  }, []);

  const getLatest = async () => {
    try {
      // let tempNotices = await getLatestNotice();
      // console.log(`notices === ${JSON.stringify(tempNotices?.data)}`)
      // setLatest(tempNotices?.data);

      console.log(post.edges[0].node);

      let tempLatest = [...latest];
      tempLatest[0] = {
        articleId: post.edges[0].node.id,
        heading: post.edges[0].node.frontmatter.title,
        slug: post.edges[0].node.fields.slug,
      };
      if (post.edges[1] !== undefined) {
        tempLatest[1] = {
          articleId: post.edges[1].node.id,
          heading: post.edges[1].node.frontmatter.title,
          slug: post.edges[1].node.fields.slug,
        };
      }
      setLatest([...tempLatest]);
    } catch (error) {}
  };

  const getMostRead = (data) => {
    let tempData = [];
    let counter = 0;
    data.forEach((card) => {
      if (counter < 3) {
        if (card.type === 1) {
          tempData.push({
            heading: card.heading,
            date: card.date,
            id: card.articleId,
          });
          counter = counter + 1;
        }
      }
      setMostRead(tempData);
    });
  };

  const articleOnClick = (slug) => {
    window.location.pathname = `${slug}`;
  };

  const selectArticle = (slug) => {
    window.location.pathname = `${slug}`;
  };

  const HandleToogleTag = (tag, type) => {
    let baseUrl = "/articlecatalog";
    if (tag === "") {
      baseUrl = baseUrl;
    } else {
      baseUrl = baseUrl + `/${type ? type : 1}/${tag}`;
    }
    if (isBrowser) {
      window.scroll(0, 0);
    }
    window.localStorage.setItem();
    // history.push(baseUrl);
  };

  //   useEffect(() => {
  //     handleGetArticle(
  //       tagParam ? tagParam : "",
  //       typeParam ? parseInt(typeParam) : 0
  //     );
  //     setActiveTag({
  //       tag: tagParam ? tagParam : "",
  //       type: typeParam ? parseInt(typeParam) : 0,
  //     });
  //     getLatest();
  //     window.scrollTo(0, 0);
  //   }, [tagParam, typeParam]);

  return (
    <Layout>
      <div className="article_wrapper">
        <Catalog
          catalogTitle={ARTICLECATALOG.catalogTitle}
          catalogSubText={`${articles.length} ${ARTICLECATALOG.catalogSubTitle}`}
          catalogSubSubText={ARTICLECATALOG.catalogSubtext}
          catalogImage={ARTICLECATALOG.banner}
          type="Article"
          mostReadTitle={"Most Read"}
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
