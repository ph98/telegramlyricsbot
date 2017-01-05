var yql = require('yql');
var google = require('google');


function fetch_data(callback , item) {
    callback = callback || function() {}
    google("site:www.azlyrics.com " + item, function (err, res) {
    var lyrick="Cant Find this please try Another one!";
	if(res.links.length==0){
  		callback(lyrick);
		return;
	}
      var gog1=res.links[0].link;
      console.log(item);

    var options = 'select content from html where url="'+gog1+'" and (xpath="//div/div/b" or xpath="//div/div/div/h2/b" or xpath="//div/div/div")';
    new yql.exec(options, function(response) {
    
lyrick = response.query.results.b[0]+"\nby "+response.query.results.b[1].substring(0, response.query.results.b[1].length - 6)+"\n"+ response.query.results.div[12]+ " \n";

        callback(lyrick);
    });
  });

}

module.exports = fetch_data;
