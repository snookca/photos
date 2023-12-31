const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addFilter('prettyDate', (dateObj) => {
    var d = DateTime.fromJSDate(dateObj, {zone:'utc'});
    return d.toFormat("LLLL d, kkkk");
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("CNAME");


	eleventyConfig.addShortcode("mapbox", async function(lat, lng, street) {
    let style = "ckku1jdtt2p3g17muzxchss7i", zoom = "12";
    if (street) {
      style =  "ckktzes5022w617p8l034a276"
        zoom = "14";
    } 
    src= "https://api.mapbox.com/styles/v1/snookca/" + style + "/static/" + lng + "," + lat + "," + zoom + ",0/700x1024@2x?attribution=false&logo=false&access_token=pk.eyJ1Ijoic25vb2tjYSIsImEiOiJja2t0emQ1OG8wbHQ3Mm9tcGpoNWh2czg0In0.Mh7Of5-Eafx82zABkjLAtQ"
		let metadata = await Image(src, {
			widths: [1024],
			formats: ["png"]
		});


		let data = metadata.png[0];
		return data.url;
	});
};

