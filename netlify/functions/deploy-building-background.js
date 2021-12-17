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

exports.handler = async function (event) {
  // your server-side functionality

  const { content, destination } = JSON.parse(event.body);
  console.log(`Sending PDF report to ${destination}`);

  updateArticle().then((res) => {
    console.log(res);
  });
};
