```
npm install
npm run dev
```

```sh
curl -X POST http://localhost:4000/guess-pdf -F "file=@sample.pdf" -F "isignifApiUrl=http://localhost:3000/api/v1" -H "Authorization: $TKN"
```
