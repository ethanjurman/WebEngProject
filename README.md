# WebEngProject
Comic Sans Enterprise Edition

## Startup
Install `npm` (`v2.14`) and `node` (`v4.2`)
`npm install`

for running various API's make a directory `keys/` and place in it:
`weather-key` - key for http://api.openweathermap.org/

### run client
`npm run watch` (will update on file changes)
### run server
`npm run server` (listens on port 3000 ... localhost:3000)

## File structure

### src
The folder with code :+1:

#### server
`server.js` - has server side code. Hosts on localhost:3000

#### client
Client side code
`index.js` - main page. Has the `main` div (which gets loaded with React Content). This shouldn't get modified unless adding a store or more pages.

##### css
all the css files (`styles.css`)

##### js
`main.js` - loads the `MainPage` into the `main` div.

###### components
All React components get placed here.
