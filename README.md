# SimilarSubstring

SimilarSubstring is a library that helps you to search for the most similar pattern from the text/paragraph you provided.

## Algorithm used
This library is implemented based on [Evolutionary Distance algorithm](https://coek.info/pdf-the-theory-and-computation-of-evolutionary-distances-pattern-recognition-.html) written by Sellers, Peter H. It is similar to Levenshtein Distance algorithm, but it is optimized for searching a similar part of the sequence.

## Features
- Search for the most similar part of the string by the given pattern
- Return all of the parts if there is more than one most part which is scored the highest mark in terms of similarity

## Installation
Install using NPM
```sh
npm install similar-substring --save
```

Import to your code
```
import similarSubstring from 'similar-substring';
```

## Example
#### Usage
```
import similarSubstring from 'similar-substring';

// Your code here
const result = similarSubstring("mod", "I am coding");
```

#### Output
```
{
  similarity: 0.6666666666666666,
  items: [
    { substring: 'od', range: { startIndex: 6, endIndex: 7 } },
    { substring: 'cod', range: { startIndex: 5, endIndex: 7 } }
  ]
}
```