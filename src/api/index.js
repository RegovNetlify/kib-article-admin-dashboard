import React from "react";
import axios from "axios";

export const API_ENDPOINT = {
  SITE_SEARCH: "https://api.regovitservices.com/v1/api/app/search",
  RelatedArticle: "https://api.regovitservices.com/v1/api/app/content/relatedarticles",
  ARTICLE: "https://api.regovitservices.com/v1/api/app/content/articles",
  NOTICELIST: "https://api.regovitservices.com/v1/api/app/content/notices",
  LATESTNOTICES: "https://api.regovitservices.com/v1/api/app/content/latestNotices",
};

export const API_Call = async (url, data, options) => {
  let response;
  try {
    response = await axios.post(url, data, options);
  } catch (error) {
    response = null;
  }
  return response;
};

export const siteSearch = async (input, pageNo) => {
  /**
       * type - 1 articles
        type - 2 Notices
        type - 3 funds
       */
  return await API_Call(API_ENDPOINT.SITE_SEARCH, {
    key: input,
    pageNo: pageNo,
  });
};

export const getArticle = async (id) => {
  return await API_Call(API_ENDPOINT.ARTICLE, { type: 1, articleId: id });
};

export const getNotice = async (id) => {
  return await API_Call(API_ENDPOINT.NOTICELIST, { type: 2, articleId: id });
};
export const getLatestNotice = async (id) => {
  return await API_Call(API_ENDPOINT.LATESTNOTICES, { articleId: id });
};
export const getLatestArticle = async (id, tag, type) => {
  console.log(
    `data being send ::: ${JSON.stringify({
      articleId: id,
      tag: tag[0],
      type: type ? type : 1,
    })}`
  );
  return await API_Call(API_ENDPOINT.RelatedArticle, {
    articleId: id,
    tag: tag[0],
    type: type ? type : 1,
  });
};
