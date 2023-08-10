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


	// WebC
	eleventyConfig.addShortcode("thumb", async function(src) {
    src = "img/" + src;
		let metadata = await Image(src, {
			widths: [400],
			formats: ["jpeg"]
		});

    console.log(metadata);
		// You bet we throw an error on a missing alt (alt="" works okay)
//		return Image.generateHTML(metadata, imageAttributes);

		let data = metadata.jpeg[0];
		return `<img src="${data.url}" height="200" alt="" loading="lazy" decoding="async">`;
	});
};

