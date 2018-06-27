// var BrainJSClassifier = require("natural-brain");
// var classifier = new BrainJSClassifier();

var natural = require("natural");
// var classifier = new natural.BayesClassifier();
// var classifier = new natural.Classifier();

const createEmptyJson = name => {
  typeof name === "string"
    ? fs.writeFileSync(`${name}.json`, "file contents")
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
  classifier.train();
  // console.log("classifier trained");
  saveClassifier(classifier, "classifier.json");
  // console.log("classifier saved");
};

// createNewClassifier()
// loadClassifier('classifier.json', loadedCB)
loadClassifier('classifier.json', retrainClassifier)
// loadClassifier('classifier.json', loadedCB)
