exports.handler = async function (event, context) {
  // your server-side functionality
  fetch("https://api.regovitservices.com/v1/api/app/updatearticle").then(
    (res) => {
      console.log(res);
    }
  );
};
