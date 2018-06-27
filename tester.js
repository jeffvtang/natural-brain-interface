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

const loadClassifier = (filename, cb) => {
    BrainJSClassifier.load(filename, null, null, cb);
};

const testCB = (error, classifier) => {
    console.log("The candy was bad\n", classifier.getClassifications("The candy was bad"));
    console.log("The food was good\n", classifier.getClassifications("The food was good"));
    console.log("The candy was not bad\n", classifier.getClassifications("The food was not good not bad"));
};

const prepareDataSet = (dataSet) => {
    var parsedArray = fs.readFileSync(dataSet).toString().split("\n");;
    finalArray = [];
    for (var i = 0; i < 2; i++) {
        let dataPoint = parsedArray[i];
        let match = dataPoint.match(/(.*)\s(0|1)$/)
        dataObject = {};

        //match 1 has content and match 2 has sentiment
        let content = match[1];
        content = removeStopWords(content);
        console.log('returned content', content);
        dataObject.content = content;

        match[2] == 1 ? dataObject.sentiment = 'positive' : dataObject.sentiment = 'negative';
        finalArray.push(dataObject);
    }
    addDataSet(finalArray);
}

const removeStopWords = (content) => {
    let stopWords = ['i', 'is', 'be', 'am', 'this', 'restaurant', 'are', 'was', 'will', 'were'];

    return content.split(' ').filter(word => stopWords.indexOf(word.toLowerCase()) == -1).join(' ');

    // content = content.split(' ');
    // let stringToReturn = [];
    // for (var i = 0; i < content.length; i++) {
    //     if (stopWords.indexOf(content[i].toLowerCase()) != -1) {
    //             !stopwords

    //     } else {

    //         stringToReturn.push(content[i]);
    //     }
    // }
    // content = stringToReturn.join(' ');


}

function is_in_array(s, your_array) {
    for (var i = 0; i < your_array.length; i++) {
        if (your_array[i].toLowerCase() === s.toLowerCase()) return true;
    }
    return false;
}





const retrainClassifier = (error, classifier) => {
    console.log("retraining");
    prepareDataSet('yelp.txt')
    console.log("new feature added");


    classifier.retrain();
    saveClassifier('classifier.json')
}
const addDataSet = (dataSet) => {

    console.time();
    dataSet.forEach(function(item) {
        classifier.addDocument(item.content, item.sentiment);
    });
    console.timeEnd();
    console.time();
    classifier.train();
    console.timeEnd();
    saveClassifier('classifier.json');
}

//add to test
//manually add document
const start = (argv) => {
    const command = argv[2];
    switch (command) {
        case 'new':
            prepareDataSet('yelp.txt');
            break;
        case 'test':
            loadClassifier('classifier.json', testCB);
            break;
        case 'add':
            loadClassifier('classifier.json', retrainClassifier)
            break;
    }
}
console.log(start(process.argv));