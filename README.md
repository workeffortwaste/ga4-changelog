# ga4-changelog

Fetch the latest "what's new" changes for Google Analytics 4 and return them in an object in HTML and Markdown format.

> **Support this project** <br/> Help support the work that goes into creating and maintaining my projects and sponsor me via [GitHub Sponsors](https://github.com/sponsors/workeffortwaste/).

## Getting Started

### Installation

To install the dependencies, run:

```sh
npm install ga4-changelog
```

### Usage

To use the `changelog` function, import it and call it with an optional language code:

```javascript
import changelog from 'ga4-changelog';

(async () => {
  const changes = await changelog('en');
  console.log(changes);
})();
```

## API

### `changelog(languageCode)`

Fetches the latest "what's new" changes for Google Analytics 4.

- **Parameters:**
  - `languageCode` (string): ISO two-letter language code (default is 'en').

- **Returns:**
  - An array of objects containing the "what's new" changes.

## Output Format

The output is an array of objects, each containing the following properties:

- `id` (string): The ID of the update.
- `html` (string): The raw HTML content of the updates.
- `update` (string): Update heading extracted from the HTML.
- `markdown` (string): The Markdown representation of the HTML content.
- `date` (Date): The date of the update.

Example output:

```json
[
  {
    "id": "20230101",
    "html": "<h3>Manual traffic source dimensions and report</h3>\n\n<p>...",
    "update": "Manual traffic source dimensions and report",
    "markdown": "### Manual traffic source dimensions and report\n\n...",
    "date": "2024-02-08T00:00:00.000Z"
  }
]
```

## Dependencies

- `got`: For making HTTP requests.
- `node-html-markdown`: For converting HTML to Markdown.

## Author

Chris Johnson - [defaced.dev](https://defaced.dev) - [@defaced](http://twitter.co.uk/defaced/)
            
