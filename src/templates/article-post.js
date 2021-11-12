import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Content, { HTMLContent } from "../components/Content";
import { kebabCase } from "lodash";
import { SINGLEARTICLE } from "../constants";
import {
  getArticle,
  getLatestArticle,
  getLatestNotice,
  getNotice,
} from "../api";

export const ArticlePostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;
  let notice = false;
  const handlePrint = () => {
    let content = document.getElementById(
      `${notice ? "notice" : "article"}:${id}`
    );
    let oHideFrame = document.createElement("iframe");

    oHideFrame.style.position = "fixed";
    oHideFrame.style.display = "block";
    oHideFrame.style.visibility = "hidden";
    oHideFrame.style.right = "0";
    oHideFrame.style.bottom = "0";
    oHideFrame.style.width = "0";
    oHideFrame.style.height = "0";
    oHideFrame.style.border = "0";
    document.body.appendChild(oHideFrame);
    // oHideFrame.onload = setPrint
    let pri = oHideFrame.contentWindow;
    if (pri) {
      pri.document.open();
      if (content) {
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.onbeforeunload = closePrint;
        pri.onafterprint = closePrint;
        pri.focus();
        pri.print();
      }
    }
  };
  let history = useHistory();

  const [artilceData, setArticledata] = useState({
    author: "x",
    content: content,
    date: "date",
    tags: ["x"],
    heading: title,
  });

  const [related, setRelated] = useState([
    {
      heading: "",
      articleId: 0,
      tags: [""],
    },
  ]);

  let pathname = "";
  let { id } = "0";

  const relatedOnClick = (index) => {
    if (notice) {
      history.push(`/SingleNotice/${index}`);
    } else {
      history.push(`/SingleArticle/${index}`);
    }
  };

  const setRelatedArticles = async (id, tag, type) => {
    try {
      let response = await getLatestArticle(id, tag, type);
      console.log("===============related=====================");
      console.log(response?.data);
      setRelated(response?.data);
    } catch (error) {
      console.log("===============related=====================");
      console.log(error);
      console.log("================related====================");
    }
  };

  const setRelatedNotice = async (id) => {
    try {
      let response = await getLatestNotice(id);
      console.log("===============related==notice===================");
      console.log(response?.data);
      setRelated(response?.data);
    } catch (error) {
      console.log("===============related===notice=============");
      console.log(error);
      console.log("================related====================");
    }
  };
  const isBrowser = typeof window !== "undefined";

  const HandleToogleTag = (tag, type) => {
    if (isBrowser) {
      window.scroll(0, 0);
    }
    history.push(`/articlecatalog/${type ? type : 1}/${tag}`);
  };

  useEffect(() => {
    if (notice) {
      //   getNotice(parseInt(id))
      //     .then((res) => {
      //       setArticledata({
      //         author: res?.data["author"],
      //         content: res?.data["content"],
      //         date: res?.data["date"],
      //         heading: res?.data["heading"],
      //         tags: res?.data["tags"],
      //       });
      //     })
      //     .catch((err) => {
      //       console.error(err);
      //     });
      //   setRelatedNotice(parseInt(id));
    } else {
      //   getArticle(parseInt(id))
      //     .then((res) => {
      //       setArticledata({
      //         author: res?.data["author"],
      //         content: res?.data["content"],
      //         date: res?.data["date"],
      //         heading: res?.data["heading"],
      //         tags: res?.data["tags"],
      //       });
      //       setRelatedArticles(parseInt(id), res?.data["tags"], 1);
      //     })
      //     .catch((err) => {
      //       console.error(`error while geting article ${err}`);
      //     });
    }
    if (isBrowser) {
      window.scrollTo(0, 0);
    }
  }, [id, notice]);

  function closePrint(t) {
    document.body.removeChild(t.__container__);
  }

  return (
    <section className="section">
      <div className="flex_row sa">
        <div className="sa_info_container">
          <div className="sa_info">
            <div className="sa_related_header">{SINGLEARTICLE.share}</div>
            <div className="flex_row flex-wrap">
              {SINGLEARTICLE.shareLogo.map((img, index) =>
                SINGLEARTICLE.shareLink[index] === "" ? (
                  <div onClick={handlePrint}>
                    <img
                      src={img}
                      alt={img}
                      className="sa_share_img cursor_pointer"
                    />
                  </div>
                ) : isBrowser ? (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={SINGLEARTICLE.shareLink[index]
                      .replace("{title}", artilceData.heading)
                      .replace("{url}", window.location.href)}
                  >
                    {console.log(pathname)}
                    <img src={img} alt={img} className="sa_share_img" />
                  </a>
                ) : null
              )}
            </div>
            <div className="sa_border" />
            <div className="sa_related_header">{SINGLEARTICLE.tag}</div>
            <div className="flex_row">
              {artilceData.tags.map((tag) => (
                <div
                  className="sa_related_tag cursor_pointer"
                  onClick={() => HandleToogleTag(tag, 1)}
                >
                  {tag}
                </div>
              ))}
            </div>
            {notice ? null : (
              <>
                <div className="sa_border" />
                <div className="sa_related_header">{SINGLEARTICLE.by}</div>
                <div
                  className="sa_related_author cursor_pointer"
                  onClick={() => {
                    HandleToogleTag(artilceData.author, 2);
                  }}
                >
                  {artilceData.author}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className="sa_article_container"
          id={`${notice ? "notice" : "article"}:${id}`}
        >
          <div className="sa_article_title_container">
            {/* Inline styling is a dirty fix for the print function to capture the css */}
            <div
              className="sa_article_title"
              style={{
                fontWeight: "bold",
                fontSize: "4rem",
                lineHeight: "64px",
                letterSpacing: "-0.0025em",
                color: "#3c3c3e",
                marginBottom: "24px",
              }}
            >
              {artilceData.heading}
            </div>

            <div
              // className="sa_article_date"
              style={{
                fontSize: "17px",
                lineHeight: "24px",
                color: "#3c3c3e",
              }}
            >
              {artilceData.date}
            </div>
          </div>
          {notice ? null : (
            <div
              style={{ backgroundImage: `url(${SINGLEARTICLE.img})` }}
              className="sa_article_img"
            />
          )}

          <div
            className="sa_article_text"
            dangerouslySetInnerHTML={{ __html: artilceData.content }}
          ></div>
        </div>
      </div>
      {helmet || ""}
    </section>
  );
};

ArticlePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const ArticlePost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ArticlePostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

export default ArticlePost;

export const articlePageQuery = graphql`
  query ArticlePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`;
