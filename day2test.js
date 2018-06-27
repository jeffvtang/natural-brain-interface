// var BrainJSClassifier = require("natural-brain");
// var classifier = new BrainJSClassifier();

var natural = require("natural");
var fs = require('fs')


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
  natural.BayesClassifier.load(filename, null, cb);
};

// const loadedCB = classifier => {
const loadedCB = (error, classifier) => {
  console.log("loaded database");
  // console.log(classifier)
  console.log(classifier.classify("did the tests pass?")); // -> software
  console.log(classifier.classify("i love pie")); // -> software or food if pass
};

const retrainClassifier = (error, classifier) => {
  console.log("retraining");
  classifier.addDocument("i love pie", "food");
  console.log("new feature added");
  classifier.retrain();
  saveClassifier(classifier, 'classifier.json')
};

// take in an array of arrays of strings [['input','output'], ['input','output']]
const createNewClassifier = () => {
  var classifier = new natural.BayesClassifier();
  classifier.addDocument("my unit-tests failed.", "software");
  // classifier.addDocument("pie is my greatest love", "food");
  classifier.train()
  // console.log("classifier trained");
  saveClassifier(classifier, "classifier.json");
  // console.log("classifier saved");
};

const parseDatatoJSON = dataSet => {
  console.log('in prepareDataSet');
  var parsedArray = fs.readFileSync(dataSet).toString().split("\n");;
  finalArray = [];
  for (var i = 0; i < parsedArray.length - 1; i++) {
      let dataPoint = parsedArray[i];
      let match = dataPoint.match(/(.*)\s(0|1)$/)
      dataObject = {};
      dataObject.content = match[1];
      match[2] == 1 ? dataObject.sentiment = 'positive' : dataObject.sentiment = 'negative';
      match[2] == 1 ? dataObject.sentiment = '1' : dataObject.sentiment = '0';
      finalArray.push(dataObject);
  }
  console.log(finalArray)
}


parseDatatoJSON('yelp.txt');


// createEmptyJson('classifier')
// createNewClassifier()
// loadClassifier('classifier.json', loadedCB)
// loadClassifier('classifier.json', retrainClassifier)
// loadClassifier('classifier.json', loadedCB)
