var BrainJSClassifier = require("natural-brain");
var classifier = new BrainJSClassifier();
const fs = require('fs');

const saveClassifier = filename => {
    classifier.save(filename, function(err, classifier) {});
};

// loads classifier from filename, then does callback
const loadClassifier = (filename, cb) => {
    BrainJSClassifier.load(filename, null, null, cb);
};

const loadedCB = (error, classifier) => {
    console.log("loaded");
    console.log(classifier.classify("did the tests pass?")); // -> software
};


const createNewClassifier = () => {

    classifier.addDocument("my unit-tests failed.", "software");
    classifier.addDocument("tried the program, but it was buggy.", "software");
    classifier.addDocument("tomorrow we will do standup.", "meeting");
    classifier.addDocument("the drive has a 2TB capacity.", "hardware");
    classifier.addDocument("i need a new power supply.", "hardware");
    classifier.addDocument("can you play some new music?", "music");
    classifier.train();
    saveClassifier("classifier.json");
};

const prepareDataSet = (dataSet) => {
    console.log('in prepareDataSet');
    var parsedArray = fs.readFileSync(dataSet).toString().split("\n");;
    finalArray = [];
    for (var i = 0; i < parsedArray.length - 1; i++) {
        let dataPoint = parsedArray[i];
        let match = dataPoint.match(/(.*)\s(0|1)$/)
        dataObject = {};
        dataObject.content = match[1];
        match[2] == 1 ? dataObject.sentiment = 'positive' : dataObject.sentiment = 'negative';
        finalArray.push(dataObject);
    }
    console.log(finalArray)

}
const createEmptyJson = (name) => {
    typeof name === 'string' ? fs.writeFileSync(`${name}.json`, "file contents") : console.log('create file failed')
}

prepareDataSet('yelp.txt');

// createNewClassifier();
// loadClassifier('classifier.json', loadedCB)



// createEmptyJson('test')