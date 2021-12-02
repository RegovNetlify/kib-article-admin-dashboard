import React, { useState, useEffect, Fragment } from "react";
import Layout from "../components/Layout";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { HTMLContent } from "../components/Content";
import { SINGLEARTICLE } from "../constants";
import { Banner, BreadCrumb, AnnouncementCard } from "../components";

export const ArticlePostTemplate = ({
  content,
  title,
  helmet,
  author,
  tags,
  date,
  allData,
}) => {
  const [related, setRelated] = useState([]);
  const [isRelated, setIsRelated] = useState(true);
  const isBrowser = typeof window !== "undefined";

  const relatedOnClick = (slug) => {
    if (isBrowser) {
      window.location.href = "/slug";
    }
  };

  let notice = false;
  useEffect(() => {
    let tempRelated = [...related];
    console.log(allData.edges);
    // check for tags matching this article
    allData.edges.map(({ node }) => {
      tags.map((tag) => {
        node.frontmatter.tags.map((t) => {
          if (
            t === tag &&
            node.frontmatter.title !== title &&
            tempRelated.length < 2
          ) {
            if (tempRelated.length !== 0) {
              tempRelated.map(({ heading }) => {
                if (heading !== node.frontmatter.title) {
                  tempRelated.push({
                    heading: node.frontmatter.title,
                    slug: node.fields.slug,
                    tags: node.frontmatter.tags,
                  });
                }
              });
            } else {
              tempRelated.push({
                heading: node.frontmatter.title,
                slug: node.fields.slug,
                tags: node.frontmatter.tags,
              });
            }
          }
        });
      });
    });
    /// if no tags match go for article
    if (tempRelated.length === 0) {
      allData.edges.map(({ node }) => {
        if (
          node.frontmatter.author &&
          node.frontmatter.author === author &&
          node.frontmatter.title !== title
        ) {
          if (tempRelated.length !== 0) {
            tempRelated.map(({ heading }) => {
              if (heading !== node.frontmatter.title) {
                tempRelated.push({
                  heading: node.frontmatter.title,
                  slug: node.fields.slug,
                  tags: node.frontmatter.tags,
                });
              }
            });
          } else {
            tempRelated.push({
              heading: node.frontmatter.title,
              slug: node.fields.slug,
              tags: node.frontmatter.tags,
            });
          }
        }
      });
    }
    // if neither matches put the latest articles
    if (tempRelated.length === 0) {
      allData.edges.map(({ node }, index) => {
        if (index < 2) {
          tempRelated.push({
            heading: node.frontmatter.title,
            slug: node.fields.slug,
            tags: node.frontmatter.tags,
          });
        }
      });
      setIsRelated(true);
    }
    console.log(tempRelated);
    setRelated([...tempRelated]);
    tags.map((tag) => (tag === "notice" ? (notice = true) : null));
  }, []);
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

  const [artilceData, setArticledata] = useState({
    author: author,
    content: content,
    date: date,
    tags: tags,
    heading: title,
  });

  let pathname = "";
  let { id } = "0";

  const HandleToogleTag = (tag, type) => {
    if (isBrowser) {
      window.scroll(0, 0);
      window.location.href = `/`;
      sessionStorage.setItem("tag", JSON.stringify(`${type + "/" + tag}`));
    }
  };

  useEffect(() => {
    if (isBrowser) {
      window.scrollTo(0, 0);
    }
  }, [id, notice]);

  function closePrint(t) {
    document.body.removeChild(t.__container__);
  }
  return (
    <Fragment>
      <Banner height="112px" img="">
        <div className="sa_banner flex_row_vertical_center sa">
          <BreadCrumb pathName={`/home/Articles/${artilceData.heading}`} />
        </div>
      </Banner>
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
                {tags.map((tag) => (
                  <div
                    className="sa_related_tag cursor_pointer"
                    onClick={() => HandleToogleTag(tag, 1)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
              {artilceData.author === "-" ? null : notice ? null : (
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
                style={{
                  fontSize: "17px",
                  lineHeight: "24px",
                  color: "#3c3c3e",
                }}
              >
                {artilceData.date.replaceAll(",", "")}
              </div>
            </div>
            <div
              className="sa_article_text"
              dangerouslySetInnerHTML={{ __html: artilceData.content }}
            ></div>
          </div>
        </div>
        {helmet || ""}
      </section>
      {related.length !== 0 && (
        <div className="catalog-notices-wrapper ash">
          <p className="catalog-notices-header">
            {isRelated ? "Related" : "Latest"}
            &nbsp;
            {notice ? SINGLEARTICLE.noticeHeading : SINGLEARTICLE.Heading}
          </p>
          <div className="catalog-notice-list">
            {related.map((data) => {
              return (
                <AnnouncementCard
                  onClick={() => relatedOnClick(data.articleId)}
                  secondary
                  tag={notice ? undefined : data.tags}
                  // heading= {notice.heading}
                  main={data.heading}
                />
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};

ArticlePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  tags: PropTypes.array,
  author: PropTypes.string,
};

const ArticlePost = ({ data }) => {
  const { markdownRemark: post } = data;
  const { allMarkdownRemark: allPost } = data;
  return (
    <Layout title="Kenanga Investors">
      <ArticlePostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        author={post.frontmatter.author}
        tags={post.frontmatter.tags}
        post={post}
        allData={allPost}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>Kenanga Investors</title>
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

ArticlePostTemplate.propTypes = {
  allData: PropTypes.shape({
    allMarkdownRemark: PropTypes.object,
  }),
};

export const articlePageQuery = graphql`
  query allArticlePageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date
        title
        description
        tags
        author
      }
    }
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
