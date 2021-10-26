exports = async function(arg){
  var response = {};

  var conn = context.services.get("mongodb-atlas").db("mongodbar").collection("inventory");
  
  var ixname_text = "Brand Label Name_text_License Class Description_text_Product Description_text";
  var ixname_std = "Brand Label Name_1_Product Description_1_License Class Description_1";
  var ixname_search = "default";
  
  var p_search = [{$search: { index: 'default',text: { query: 'whiskey',path:[	"Brand Label Name", "License Class Description", "Product Description"] }}}, {$addFields: {score: { $meta: "searchScore" }}}, {$limit: 10}]
  var p_text = [{$match: {  $text: { $search: "whiskey"}}}, {$limit: 10}] ;
  var p_std = [{$match: {$or:[    {"Brand Label Name":{$regex:".*whiskey.*", $options:"i"}}, {"License Class Description":{$regex:".*whiskey.*", $options:"i"}},   {"Product Description":{$regex:".*whiskey.*", $options:"i"}}]}}, {$limit: 10}];
  
  var r_search = await conn.aggregate(p_search);
  var r_text = await conn.aggregate(p_text);
  var r_std = await conn.aggregate(p_std);
  
  
  response["response"] = [];
  response["response"].push({query: p_search, name:"Search", result: r_search});
  response["response"].push({query: p_text, name:"Text", result: r_text});
  response["response"].push({query: p_std, name:"Standard", result: r_std});
  
  return response;
};