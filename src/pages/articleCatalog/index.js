import * as React from "react";

import Layout from "../../components/Layout";
import { Catalog } from "../../components/catalog";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getArticleList, getLatestNotice } from "../../api";
import { ARTICLECATALOG } from "../../constants";

export const CatologIndexPage = () => {
  let history = useHistory();

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
      // console.log('====================================');
      // console.log(`data = ${JSON.stringify(data)} from tags ${JSON.stringify(response?.data['articles'])}`);
      // console.log('====================================');
      setArticle(response?.data["articles"]);
      getMostRead(response?.data["articles"]);
      console.log(`tags from backend ${response?.data["tags"]}`);
      setTags(response?.data["tags"]);
    } catch (error) {
      console.log(`error is ${error}`);
    }

    
  };

  const getLatest = async () => {
    try {
      let tempNotices = await getLatestNotice();
      // console.log(`notices === ${JSON.stringify(tempNotices?.data)}`)
      setLatest(tempNotices?.data);
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

  const articleOnClick = (index) => {
    history.push(`/SingleNotice/${index}`);
  };

  const selectArticle = (index) => {
    history.push(`/SingleArticle/${index}`);
  };

  const HandleToogleTag = (tag, type) => {
    let baseUrl = "/articlecatalog";
    if (tag === "") {
      baseUrl = baseUrl;
    } else {
      baseUrl = baseUrl + `/${type ? type : 1}/${tag}`;
    }
    window.scroll(0, 0);
    history.push(baseUrl);
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
        />
      </div>
    </Layout>
  );
};

export default CatologIndexPage;
