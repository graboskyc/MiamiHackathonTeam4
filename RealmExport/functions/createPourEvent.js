exports = function(changeEvent) {
  
    // Access the _id of the changed document:
    const docId = changeEvent.documentKey._id;

    //Access the latest version of the changed document
    const fullDocument = changeEvent.fullDocument;

    const bottleMeta = {};
    bottleMeta['Brand Label Name'] = fullDocument.bottleContents;
    bottleMeta.bottleId = fullDocument.bottleId;
    const newDoc = {};
    newDoc.bottle = bottleMeta;
    newDoc.pourOunces = fullDocument.pourSize;
    newDoc.ouncesRemaining = fullDocument.remaining;
    newDoc.pourTime = new Date();

    // Access a mongodb service:
    const pourCollection = context.services.get("mongodb-atlas").db("mongodbar").collection("pours");
    const pourDoc = pourCollection.insertOne(newDoc);

    const tempCollection = context.services.get("mongodb-atlas").db("mongodbar").collection("BottleReadingTemp");
    const tempDoc = tempCollection.deleteOne({'_id': docId});
    
};