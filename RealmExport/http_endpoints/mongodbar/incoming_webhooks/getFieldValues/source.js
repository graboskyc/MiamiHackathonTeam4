const serviceName = "mongodb-atlas";
const dbName = "mongodbar";
const collName = "inventory";
const allowedFields = ["location.barName"];

exports = async function(payload, response) {
  // only filter on location or owner for now
  const filterField = payload.query.filterField;
  if (filterField.includes(filterField)) {
    await getFieldValues(filterField, response);
  } else {
    response.setStatusCode(400);
    response.setBody(`Incorrect filter field supplied: ${payload.query.filterField}`);
  }
};

async function getFieldValues(fieldName, response) {
  const mongodb = context.services.get(serviceName);
  const sensorCollection = mongodb.db(dbName).collection(collName);
  
  sensorCollection.distinct(fieldName, {})
  .then(results => {
    const results_str = JSON.stringify(results);
    response.setStatusCode(201);
    response.setBody(results_str);
  })
  .catch(err => {
    response.setStatusCode(500);
    response.setBody(`Find query failed: ${err}`);
    console.error(err)
  });
}
