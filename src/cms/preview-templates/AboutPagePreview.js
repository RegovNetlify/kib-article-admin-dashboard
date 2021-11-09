import React from "react";
import PropTypes from "prop-types";
import { AboutPageTemplate } from "../../templates/article-post";

const AboutPagePreview = ({ entry, widgetFor }) => (
  <AboutPageTemplate
    content={widgetFor("body")}
    description={entry.getIn(["data", "description"])}
    title={entry.getIn(["data", "title"])}
  />
);

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default AboutPagePreview;
