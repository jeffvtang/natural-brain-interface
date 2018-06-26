// var BrainJSClassifier = require("natural-brain");
// var classifier = new BrainJSClassifier();

var natural = require("natural");
var classifier = new natural.BayesClassifier();

const createEmptyJson = name => {
  typeof name === "string"
    ? fs.writeFileSync(`${name}.json`, "file contents")
    : console.log("create file failed");
};

// saves classifier to filename
const saveClassifier = filename => {
  classifier.save(filename, function(err, classifier) {});
};

// save - promise version
// const saveClassifier = filename => {
//   return new Promise((resolve, reject) => {
//     classifier.save(filename, (err, classifier) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(classifier);
//     });
//   });
// };

// loads classifier from filename, then does callback
const loadClassifier = (filename, cb) => {
  natural.BayesClassifier.load(filename, null, cb);
};

const loadedCB = (error, classifier) => {
  console.log("loaded database");
  console.log(classifier.classify("did the tests pass?")); // -> software
  console.log(classifier.classify("did you buy a new drive?")); // -> hardware
  console.log(classifier.classify("What is the capacity?")); // -> hardware
  console.log(classifier.classify("Lets meet tomorrow?")); // -> meeting
  console.log(classifier.classify("Can you play some stuff?")); // -> music
  console.log(classifier.classify("pie is the greatest")); // -> software if fail
};

const retrainClassifier = (error, classifier) => {
  console.log("retraining");
  classifier.addDocument("i love pie", "food");
  console.log("new feature added");
  classifier.retrain();
  saveClassifier("classifier.json");
};

// take in an array of arrays of strings [['input','output'], ['input','output']]
const createNewClassifier = () => {
  classifier.addDocument("my unit-tests failed.", "software");
  classifier.addDocument("tried the program, but it was buggy.", "software");
  classifier.addDocument("tomorrow we will do standup.", "meeting");
  classifier.addDocument("the drive has a 2TB capacity.", "hardware");
  classifier.addDocument("i need a new power supply.", "hardware");
  classifier.addDocument("can you play some new music?", "music");
  classifier.addDocument("pie is my greatest love", "food");
  classifier.train();
  console.log("classifier trained");
  saveClassifier("classifier.json");
  console.log("classifier saved");
};

// createNewClassifier();
loadClassifier('classifier.json', loadedCB)

// const createNewClassifier = () => {
//   return new Promise((resolve, reject) => {
//     classifier.addDocument("my unit-tests failed.", "software");
//     // classifier.addDocument("tried the program, but it was buggy.", "software");
//     // classifier.addDocument("tomorrow we will do standup.", "meeting");
//     // classifier.addDocument("the drive has a 2TB capacity.", "hardware");
//     // classifier.addDocument("i need a new power supply.", "hardware");
//     // classifier.addDocument("can you play some new music?", "music");
//     classifier.train();
//     console.log("classifier trained");
//     saveClassifier("classifier.json");
//     console.log("classifier saved");
//     resolve();
//   });
// };

// const createNewClassifier = async () => {
//     classifier.addDocument("my unit-tests failed.", "software");
//     // classifier.addDocument("tried the program, but it was buggy.", "software");
//     // classifier.addDocument("tomorrow we will do standup.", "meeting");
//     // classifier.addDocument("the drive has a 2TB capacity.", "hardware");
//     // classifier.addDocument("i need a new power supply.", "hardware");
//     // classifier.addDocument("can you play some new music?", "music");
//     classifier.train();
//     console.log('classifier trained')
//     saveClassifier("classifier.json");
//     console.log('classifier saved')
//     return
// };

// classifier.addDocument("my unit-tests failed.", "software");
// classifier.addDocument("tried the program, but it was buggy.", "software");
// classifier.addDocument("tomorrow we will do standup.", "meeting");
// classifier.addDocument("the drive has a 2TB capacity.", "hardware");
// classifier.addDocument("i need a new power supply.", "hardware");
// classifier.addDocument("can you play some new music?", "music");
// classifier.addDocument("pie is my greatest love", "food");

// classifier.train();

// console.log(classifier.getClassifications("did the tests pass?")); // -> software
// console.log(classifier.getClassifications("did you buy a new drive?")); // -> hardware
// console.log(classifier.getClassifications("What is the capacity?")); // -> hardware
// console.log(classifier.getClassifications("Lets meet tomorrow?")); // -> meeting
// console.log(classifier.getClassifications("Can you play some stuff?")); // -> music
// console.log(classifier.getClassifications("pie is the greatest")); // -> software if fail
