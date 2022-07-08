# Next.js Teslo Shop App
For run local enverioment, is needed the db
```

docker-compose up -d
```

* the -d, meening __detached__

* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb

```

## Set env variables 
Rename file __.env.template__ a __.env__

## Seed DB
call 

```
    http://localhost:3000/api/seed
```