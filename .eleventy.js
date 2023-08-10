const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('prettyDate', (dateObj) => {
    var d = DateTime.fromJSDate(dateObj, {zone:'utc'});
    return d.toFormat("LLLL d, kkkk");
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("CNAME");


	eleventyConfig.addShortcode("mapbox", async function(lat, lng, street) {
    let style = street ? "ckktzes5022w617p8l034a276" : "ckku1jdtt2p3g17muzxchss7i";
    src= "https://api.mapbox.com/styles/v1/snookca/" + style + "/static/" + lng + "," + lat + ",12,0/1024x1024@2x?attribution=false&logo=false&access_token=pk.eyJ1Ijoic25vb2tjYSIsImEiOiJja2t0emQ1OG8wbHQ3Mm9tcGpoNWh2czg0In0.Mh7Of5-Eafx82zABkjLAtQ"
		let metadata = await Image(src, {
			widths: [1024],
			formats: ["png"]
		});


		let data = metadata.png[0];
		return data.url;
	});
};

