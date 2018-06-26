var BrainJSClassifier = require("natural-brain");
var classifier = new BrainJSClassifier();

// classifier.addDocument('my unit-tests failed.', 'software');
// classifier.addDocument('tried the program, but it was buggy.', 'software');
// classifier.addDocument('tomorrow we will do standup.', 'meeting');
// classifier.addDocument('the drive has a 2TB capacity.', 'hardware');
// classifier.addDocument('i need a new power supply.', 'hardware');
// classifier.addDocument('can you play some new music?', 'music');

// saves classifier to filename
saveClassifier = filename => {
  classifier.save(filename, function(err, classifier) {});
};

// loads classifier from filename, then does callback
loadClassifier = (filename, cb) => {
  BrainJSClassifier.load(filename, null, null, cb);
};

loadedCB = (error, classifier) => {
  console.log("loaded");
  console.log(classifier.classify("did the tests pass?")); // -> software
  console.log(classifier.classify("did you buy a new drive?")); // -> hardware
  console.log(classifier.classify("What is the capacity?")); // -> hardware
  console.log(classifier.classify("Lets meet tomorrow?")); // -> meeting
  console.log(classifier.classify("Can you play some stuff?")); // -> music
};

// console.log("loaded");
// classifier.addDocument("i love pie", "food");
// console.log("new feature added");
// classifier.retrain();
// classifier.save("classifier.json", function(err, classifier) {});

// BrainJSClassifier.load("classifier.json", null, null, function(error, classifier) {
//     console.log("loaded");
//   console.log(classifier.classify("did the tests pass?")); // -> software
//   console.log(classifier.classify("did you buy a new drive?")); // -> hardware
//   console.log(classifier.classify("What is the capacity?")); // -> hardware
//   console.log(classifier.classify("Lets meet tomorrow?")); // -> meeting
//   console.log(classifier.classify("Can you play some stuff?")); // -> music
//   console.log(classifier.classify('pie is great')); // -> personal if worked, software if failed
// })

// take in an array of arrays of strings [['input','output'], ['input','output']]
createNewClassifier = () => {
  classifier.addDocument("my unit-tests failed.", "software");
  classifier.addDocument("tried the program, but it was buggy.", "software");
  classifier.addDocument("tomorrow we will do standup.", "meeting");
  classifier.addDocument("the drive has a 2TB capacity.", "hardware");
  classifier.addDocument("i need a new power supply.", "hardware");
  classifier.addDocument("can you play some new music?", "music");
  classifier.train();
  saveClassifier("classifier.json");
};


loadClassifier('classifier.json', loadedCB)

// createNewClassifier()

// console.log(classifier.classify('did the tests pass?')); // -> software
// console.log(classifier.classify('did you buy a new drive?')); // -> hardware
// console.log(classifier.classify('What is the capacity?')); // -> hardware
// console.log(classifier.classify('Lets meet tomorrow?')); // -> meeting
// console.log(classifier.classify('Can you play some stuff?')); // -> music
