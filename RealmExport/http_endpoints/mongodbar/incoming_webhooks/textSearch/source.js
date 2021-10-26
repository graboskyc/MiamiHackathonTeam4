exports = function(payload) {
  const collection = context.services.get("mongodb-atlas").db("mongodbar").collection("inventory");
  let arg = payload.query.arg;
  return collection.aggregate([
    { $search: {
      text: {
        query: arg,
        path: 'Brand Label Name',
      },
      highlight: { path: 'Brand Label Name' }
    }},
    { $project: {
      'Brand Label Name': 1,
      _id: 0,
      'Product Description': 1,
      'Domestic (D) or Imported (I)': 1,
      volumeInOz: 1,
      score: { $meta: 'searchScore'},
      highlight: {$meta: 'searchHighlights'}
    }},
    { $limit: 10 }
    ]).toArray();
};