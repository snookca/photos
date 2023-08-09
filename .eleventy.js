const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('prettyDate', (dateObj) => {
    var d = DateTime.fromJSDate(dateObj, {zone:'utc'});
    return d.toFormat("LLLL d, kkkk");
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("CNAME");

};
