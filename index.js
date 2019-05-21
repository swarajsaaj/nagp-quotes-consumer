const express = require('express')
const app = express()
const port = 8080
const request = require('request');
const source = process.env.QUOTES_URL||"http://localhost:8080";

app.get('/consume', (req, res) => {
	request(source+'/quote', { json: true }, (err, resp, body) => {
	  if (err || !body.text) {
	  	  res.send("Error while getting quotes from "+source) 
	  } else{
		  res.send({
		  	"quote":body.text,
		  	"time":new Date(),
		  	"source":source
		  });
	  }
	  
	});
})


app.use(express.static('public'))

app.listen(port, () => console.log(`NAGP-quotes-consumer app listening on port ${port}!`))
