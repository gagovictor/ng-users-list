# users-list
Frontend exercise; search and render a list of users obtained from an external API. Built with Angular Material.

User data is fetched from Random User Generator API (https://randomuser.me/).

## Features
* Supports two view modes: table or cards list.
* Allows filtering of results by gender, nationality
* User can specify the fields desired from the API, allowing for flexible visualization of data and potentially reducing network load.
** By changing the desired fields, the table/cards layout are also updated accordingly.
* Infinite scrolling

## Serving the Application - Angular CLI
* First, 'cd' to project directory and run
`
npm install
ng serve
`
* The application will be served on localhost, port 4200: http://localhost:4200.



## Serving the Application - Docker
* First, 'cd' to project directory and run
`
docker build -t users-list .
docker run -it --rm -p 9000:80 users-list
`
* Alternatively, you can run `./build_docker_image.sh` from root folder and get the same result.
* The application will be served on localhost, port 9000: http://localhost:9000.

## Improvements
* So far, only unit tests were written to test individual component functionality. Integrated and E2E tests would be an improvement to further fail-proof the code.
* Additionally, there could be a page or modal displaying an individual user's information.
* Updating nationality or gender filters could also enable those fields in the view, if they were previously disabled.
