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
var photos;
var val = {};
//GET home page.
router.get('/', function(req, res, next) {
 
  if (process.argv.length <= 2) {
      console.log("Usage: " + __filename + " path/to/directory");
      //process.exit(-1);
  }


  //var path = process.argv[2];
  //var path = require('path');
  //console.log(path.normalize('C:\Dev\FacePoseTF\img'));

  var path = __dirname + '\\img\\';
  console.log("DIR path: " + path);
  //var newPath = path.dirname('./express-app');

  fs.readdir(path, function(err, items) {
      //console.log(items);
      photos = items;

      len = items.length;

      //for (var i=0; i<items.length; i++) {
          console.log(items[i]);

		    var obj = {labels: ['+821099395223'], similarities:['0.7009658187057358']};
			val[items[i]] = obj;
          //POST
		filepath = path+items[i];
		var fileOne = items[i];
		/*
		// 헤더 부분
		var headers = {
		    'Content-Type':'form-data'
		}
		
		// 요청 세부 내용
		var options = {
		    url: url,
		    method:'POST',
		    headers: headers,
		    form: {'photo': form}
		}
		 
		// 요청 시작 받은값은 body
		request(options, function (error, response, body) {
			console.log("test! "+response+"\n\n\n\n\n");
		    if (!error && response.statusCode == 200) {
		        console.log(body)
		    }
		})*/

	    //console.log('#############  ', obj.labels);
	    /*getRoutes(function(err, data){ 
	        if(err) return res.send(err);       
	        //res.send(data);
	        var obj = JSON.parse(data);
	   	    val.push(obj);
	    });*/

		
		var req = request.post(url, function (err, resp, body) {
		  if (err) {
		    console.log('Error!', i,cnt, fileOne, err);
		  } else {
		    console.log('!!!!!!!!!!!!!!!!!!!  ', typeof(body), body);
	        //result = JSON.stringify(JSON.parse(body));          
	        result = JSON.parse(body);
	   	    val[fileOne] = result;
	   	    //val.items[i] = result;

	   	    fs.writeFile(__dirname + '\\txt\\' + fileOne.split('.')[0] + '.txt', body, 'utf8',function(err) {
                if (err) throw err;
                console.log('JSON color writeFileSync completed');
            });

		  }
		  i++;
	   	  cnt++;
		});
		var form = req.form();
		form.append('photo', fs.createReadStream(filepath));

      //}

	    console.log('Error???', cnt, JSON.stringify(val));
    //if(cnt >= items.length) res.render('index', {photo: items, resp:val});
  if(cnt >= len-1 || cnt > 100) { next(); res.end(); }
	//res.render('index', {photo: val});
	//setTimeout(function(){ res.render('index', {photo: items, resp:val}); }, 10000);
  });

}, function(req, res) {
  	res.render('index', {photo: photos, resp:val});
});

module.exports = router;
