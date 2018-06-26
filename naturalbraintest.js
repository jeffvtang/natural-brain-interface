var BrainJSClassifier = require("natural-brain");
var classifier = new BrainJSClassifier();

const createEmptyJson = (name) => {
    typeof name === 'string' ? fs.writeFileSync(`${name}.json`, "file contents") : console.log('create file failed')
}

// saves classifier to filename
const saveClassifier = filename => {
  classifier.save(filename, function(err, classifier) {});
};

// loads classifier from filename, then does callback
const loadClassifier = (filename, cb) => {
  BrainJSClassifier.load(filename, null, null, cb);
};

loadedCB = (error, classifier) => {
  console.log("loaded database");
  console.log(classifier.classify("did the tests pass?")); // -> software
  // console.log(classifier.classify("did you buy a new drive?")); // -> hardware
  // console.log(classifier.classify("What is the capacity?")); // -> hardware
  // console.log(classifier.classify("Lets meet tomorrow?")); // -> meeting
  // console.log(classifier.classify("Can you play some stuff?")); // -> music
  // console.log(classifier.classify("pie is the greatest")); // -> software if fail
  return Promise.resolve();
};

// use newFilename if creating to new
retrainClassifier = (error, classifier) => {
  console.log("retraining");
  classifier.addDocument("i love pie", "food");
  console.log("new feature added");
  classifier.retrain();
  saveClassifier('classifier.json')
}  

// take in an array of arrays of strings [['input','output'], ['input','output']]
const createNewClassifier = () => {
    classifier.addDocument("my unit-tests failed.", "software");
    // classifier.addDocument("tried the program, but it was buggy.", "software");
    // classifier.addDocument("tomorrow we will do standup.", "meeting");
    // classifier.addDocument("the drive has a 2TB capacity.", "hardware");
    // classifier.addDocument("i need a new power supply.", "hardware");
    // classifier.addDocument("can you play some new music?", "music");
    classifier.train();
    saveClassifier("classifier.json");
    console.log('classifier created and saved')
    return Promise.resolve();
};

let createWhole = new Promise((resolve, reject) => {
  classifier.addDocument("my unit-tests failed.", "software");
  classifier.addDocument("tried the program, but it was buggy.", "software");
  classifier.addDocument("tomorrow we will do standup.", "meeting");
  classifier.addDocument("the drive has a 2TB capacity.", "hardware");
  classifier.addDocument("i need a new power supply.", "hardware");
  classifier.addDocument("can you play some new music?", "music");
  classifier.addDocument("pie is my greatest love", "food");
  classifier.train();
  resolve('success')
  //   // saveClassifier("classifier.json");
})

createNewClassifier()
.then(r => {loadClassifier('classifier.json', loadedCB)})
.then(r => {loadClassifier('classifier.json', retrainClassifier)})
.then(r => {loadClassifier('classifier.json', loadedCB)})

// createNewClassifier()

// console.log(classifier.classify('did the tests pass?')); // -> software
// console.log(classifier.classify('did you buy a new drive?')); // -> hardware
// console.log(classifier.classify('What is the capacity?')); // -> hardware
// console.log(classifier.classify('Lets meet tomorrow?')); // -> meeting
// console.log(classifier.classify('Can you play some stuff?')); // -> music
