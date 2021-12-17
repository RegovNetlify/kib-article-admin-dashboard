import axios from "axios";

export const API_Call = async (url, data, options) => {
  let response;
  try {
    response = await axios.post(url, data, options);
  } catch (error) {
    response = null;
  }
  return response;
};

export const updateArticle = async () => {
  return await API_Call(
    "https://api.regovitservices.com/v1/api/app/updatearticle"
  );
};

exports.handler = async function () {
  // your server-side functionality


  updateArticle().then((res) => {
    console.log(res);
  });
};
