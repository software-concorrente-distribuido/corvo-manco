Taverna-fe

Now using node v19.6.0 (npm v9.4.0)

```
    npm install
    npm start
```

Port 8080

# Docker

With Docker installed run

```
docker build -t front-end:latest .
```

After building, run the following command


```
docker run -d -p 4000:80 --name front-end front-end:latest
```
