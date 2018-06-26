var BrainJSClassifier = require("natural-brain");
var classifier = new BrainJSClassifier();

const createEmptyJson = (name) => {
    typeof name === 'string' ? fs.writeFileSync(`${name}.json`, "file contents") : console.log('create file failed')
}

// saves classifier to filename
// const saveClassifier = filename => {
//   classifier.save(filename, function(err, classifier) {});
// };
const saveClassifier = filename => {
  return new Promise( (resolve, reject) => {
    classifier.save(filename, (err, classifier) => {
      if (err) {
        reject(err)
        return
      } 
      resolve(classifier)
    })
  })
}
// loads classifier from filename, then does callback
const loadClassifier = (filename, cb) => {
  BrainJSClassifier.load(filename, null, null, cb);
};




const loadedCB = (error, classifier) => {
  console.log("loaded database");
  console.log(classifier.classify("did the tests pass?")); // -> software
  // console.log(classifier.classify("did you buy a new drive?")); // -> hardware
  // console.log(classifier.classify("What is the capacity?")); // -> hardware
  // console.log(classifier.classify("Lets meet tomorrow?")); // -> meeting
  // console.log(classifier.classify("Can you play some stuff?")); // -> music
  // console.log(classifier.classify("pie is the greatest")); // -> software if fail
  return Promise.resolve('success');
};

const retrainClassifier = (error, classifier) => {
  console.log("retraining");
  classifier.addDocument("i love pie", "food");
  console.log("new feature added");
  classifier.retrain();
  saveClassifier('classifier.json')
  return Promise.resolve('success');
}  

// take in an array of arrays of strings [['input','output'], ['input','output']]
const createNewClassifier = () => {
  return new Promise( (resolve, reject) => {
    classifier.addDocument("my unit-tests failed.", "software");
    // classifier.addDocument("tried the program, but it was buggy.", "software");
    // classifier.addDocument("tomorrow we will do standup.", "meeting");
    // classifier.addDocument("the drive has a 2TB capacity.", "hardware");
    // classifier.addDocument("i need a new power supply.", "hardware");
    // classifier.addDocument("can you play some new music?", "music");
    classifier.train();
    console.log('classifier trained')
    saveClassifier("classifier.json");
    console.log('classifier saved')
    resolve()
  })
};

const createNewClassifier = async () => {
    classifier.addDocument("my unit-tests failed.", "software");
    // classifier.addDocument("tried the program, but it was buggy.", "software");
    // classifier.addDocument("tomorrow we will do standup.", "meeting");
    // classifier.addDocument("the drive has a 2TB capacity.", "hardware");
    // classifier.addDocument("i need a new power supply.", "hardware");
    // classifier.addDocument("can you play some new music?", "music");
    classifier.train();
    console.log('classifier trained')
    saveClassifier("classifier.json");
    console.log('classifier saved')
    return
};

const foo = () => {
  createNewClassifier().then(loadCB)
}

const foo = async () => {
  await createNewClassifier()
  loadCB
}


createNewClassifier()
.then(r => {loadClassifier('classifier.json', loadedCB)})


// .then(r => {loadClassifier('classifier.json', retrainClassifier)})
// .then(r => {loadClassifier('classifier.json', loadedCB)})

// createWhole
// .then(saveClassifier('classifier.json'))
// .then(r => {loadClassifier('classifier.json', loadedCB)})
// .then(r => {loadClassifier('classifier.json', retrainClassifier)})
// .then(r => {loadClassifier('classifier.json', loadedCB)})


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
