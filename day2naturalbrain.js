var BrainJSClassifier = require("natural-brain");
// var classifier = new BrainJSClassifier();

// var natural = require("natural");
var fs = require("fs");

const createEmptyJson = name => {
  typeof name === "string"
    ? fs.writeFileSync(`${name}.json`, "")
    : console.log("create file failed");
};

// saves classifier to filename
const saveClassifier = (input, filename) => {
  input.save(filename);
};

const loadClassifier = (filename, cb) => {
  BrainJSClassifier.load(filename, null, null, cb);
};

// const loadedCB = classifier => {
const loadedCB = (error, classifier) => {
  console.log("loaded database");
  // console.log(classifier)
  console.log(classifier.classify("Absolutely perfect, so many")); // -> software
  console.log(
    classifier.classify(
      "Stopped by during the late May bank holiday off Rick Steve recommendation and loved it"
    )
  ); // -> software or food if pass
};

const retrainClassifier = (error, classifier) => {
  console.log("retraining");
  // classifier.addDocument("i love pie", "food");
  console.log("new feature added");
  classifier.retrain();
  saveClassifier(classifier, "classifier.json");
};

// take in an array of arrays of strings [['input','output'], ['input','output']]
const createNewClassifier = () => {
  var classifier = new BrainJSClassifier();
  classifier.addDocument("Wow... Loved this place.", "positive");
  // classifier.addDocument("pie is my greatest love", "food");
  classifier.train();
  // console.log("classifier trained");
  saveClassifier(classifier, "classifier.json");
  // console.log("classifier saved");
};

let stopWords = ['i', 'is', 'be', 'am', 'this', 'restaurant', 'are', 'was', 'will', 'were', 'than', 'that', 'then',
    'there', 'ours', 'our', 'ought', 'other', 'or', 'only', 'once', 'on', 'off', 'myself', 'most', 'more', 'let', 'its',
    'how', 'her', 'his', 'him', 'he', 'she', 'for', 'few', 'had', 'each', '.', 'being', 'could', 'should'
];

const removeStopWords = (content) => {
  return content.split(' ').filter(word => stopWords.stops().indexOf(word.toLowerCase()) == -1).join(' ');
}

const addDataSet = (dataSet) => (error, classifier) => {
  // console.log(dataSet)
  dataSet.forEach(function(item) {
    classifier.addDocument(item.content, item.sentiment);
  });
  classifier.retrain()
  saveClassifier(classifier, "classifier.json");
};

const parseDatatoJSON = dataSet => {
  var parsedArray = fs
    .readFileSync(dataSet)
    .toString()
    .split("\n");
  finalArray = [];
  for (var i = 1; i < parsedArray.length - 1; i++) {
  // for (var i = 0; i < parsedArray.length - 1; i++) {
    let dataPoint = parsedArray[i];
    let match = dataPoint.match(/(.*)\s(0|1)$/);
    dataObject = {};
    content = match[1];
    dataObject.content = removeStopWords(content);
    // match[2] == 1 ? dataObject.sentiment = 'positive' : dataObject.sentiment = 'negative';
    match[2] == 1
      ? (dataObject.sentiment = "positive")
      : (dataObject.sentiment = "negative");
    finalArray.push(dataObject);
  }
  // console.log(finalArray)
  loadClassifier("classifier.json", addDataSet(finalArray));
};

parseDatatoJSON("yelp.txt");

  // createEmptyJson('classifier')
// createNewClassifier()
// loadClassifier('classifier.json', loadedCB)
// loadClassifier('classifier.json', retrainClassifier)
// loadClassifier('classifier.json', loadedCB)
