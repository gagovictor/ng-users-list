docker build -t users-list .
docker run -it --rm -p 9000:80 users-list