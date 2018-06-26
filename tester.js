var BrainJSClassifier = require("natural-brain");
var classifier = new BrainJSClassifier();
const fs = require('fs');

const createEmptyJson = (name, content) => {
    typeof name === 'string' ? fs.writeFileSync(`${name}.json`, `${content}`) : console.log('create file failed')
}

const saveClassifier = filename => {
        return new Promise((resolve, reject) => {
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

    console.log(classifier.classify("Wow so good"));
    console.log(classifier.classify("That was bad food"));

};
//loadClassifier('classifier.json', loadedCB);



const prepareDataSet = (dataSet) => {
    //console.log('in prepareDataSet');
    var parsedArray = fs.readFileSync(dataSet).toString().split("\n");;
    finalArray = [];
    for (var i = 0; i < 200; i++) {
        let dataPoint = parsedArray[i];
        let match = dataPoint.match(/(.*)\s(0|1)$/)
        dataObject = {};
        dataObject.content = match[1];
        match[2] == 1 ? dataObject.sentiment = 'positive' : dataObject.sentiment = 'negative';
        finalArray.push(dataObject);
    }
    //console.log(finalArray);
    addDataSet(finalArray);
}
const addDataSet = (dataSet) => {

    dataSet.forEach(function(item) {
        classifier.addDocument(item.content, item.sentiment);
    });
    classifier.train();
    saveClassifier('classifier.json');
    // console.log(dataSet[0])

}
prepareDataSet('yelp.txt');