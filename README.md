# @isignif/pdf-ai

This is a simple HTTP API to extract information from a PDF and create the act/signification on <https://isignif.fr>.

It uses [Mistral](https://mistral.ai/)'s [OCR](https://docs.mistral.ai/capabilities/document/) capabilities to understand the document, and then pass the content to get [structured output](https://docs.mistral.ai/capabilities/structured-output/json_mode/) of the request. I'll then call the [iSignif's API](https://isignif.fr/docs/openapi) to create the request.

## Setup

```
npm install
npm run dev
```

## Usage

```sh
curl -X POST http://localhost:4000/guess-pdf -F "file=@sample.pdf" -F "iSignifApiUrl=http://localhost:3000/api/v1" -F "iSignifToken=$TKN"
```

or in plain HTML

```html
<form
  method="POST"
  action="http://localhost:4000/guess-pdf"
  enctype="multipart/form-data"
>
  <input type="file" name="file" accept="application/pdf" required />
  <input type="hidden" name="iSignifToken" value="xxxx" />
  <input
    type="hidden"
    name="iSignifApiUrl"
    value="http://localhost:3000/api/v1"
  />
  <input type="submit" />
</form>
```
