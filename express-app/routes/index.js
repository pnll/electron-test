const express = require('express'),
      router = express.Router();

var fs = require('fs');
var request = require('request');


var url = 'http://52.231.202.27/predict/+821067611144';
var filepath;

function getRoutes(callback){
	var req = request.post(url, function (err, resp, body) {
	  if (err) {
	    console.log('Error!');
	    return callback(null, error);
	  } else {
	    console.log('!!!!!!!!!!!!!!  ', typeof(body), body);
        result = JSON.stringify(JSON.parse(body));          
        return callback(result, false);
	  }
	});
	var form = req.form();
	form.append('photo', fs.createReadStream(filepath));
}


var cnt = 0;
var i = 0;
var len;
var photos = [];
var val = {};
var path = __dirname + '\\img\\';
//GET home page.
router.get('/', function(req, res, next) {
 
  /*if (process.argv.length <= 2) {
      console.log("Usage: " + __filename + " path/to/directory");
      //process.exit(-1);
  }*/


  //var path = process.argv[2];
  //var path = require('path');
  //console.log(path.normalize('C:\Dev\FacePoseTF\img'));

  console.log("DIR path: " + cnt);
  //var newPath = path.dirname('./express-app');



  if(photos.length > 1) {
 	val[photos[i]] = {labels: ['+821099395223'], similarities:['0.7009658187057358']};

		  i++;
   	    cnt++;

	    //console.log('Error???', cnt, JSON.stringify(val));
	  if(cnt >= len-1 || cnt > 910) { next(); res.end(); }

  } else {
  fs.readdir(path, function(err, items) {
      console.log('################',items);
      photos = items;

      len = items.length;

          console.log(items[i]);

		val[items[i]] = {labels: ['+821099395223'], similarities:['0.7009658187057358']};
          //POST
		filepath = path+items[i];


  });  	
  }


}, function(req, res) {
  	res.render('index', {photo: photos, resp:val});
});

module.exports = router;
