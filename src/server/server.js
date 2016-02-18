import express from 'express'; // need to server files and handle requests
import bodyParser from 'body-parser'; // handle json structure

const app = express();
app.use(bodyParser.json());

// host client files as static files
app.use(express.static(__dirname + '/client'));

app.listen(3000, ()=>{
  console.log("listening on port 3000")
});

export default app;
