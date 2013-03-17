
/*
 * GET map testing page.
 */

exports.map = function(req, res){
  console.log(process.env.GOOGLE_KEY);
  res.render('map', { title: 'Map Test', GOOGLE_KEY: process.env.GOOGLE_KEY });
};