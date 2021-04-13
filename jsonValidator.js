
module.exports = function (json){

  var Validator = require('jsonschema').Validator;
  var validator=  new Validator();
  var question = {
    "id": "/question",
    "type": "object",
    "properties": {
      "type": {"type": "string", "enum": ["checkBox"]}, //// TODO:  rodzaje pytań
      "text": {"type": "string"},
      "tex": {"type": "string"},
      "answers": {"type": "array", "items": {"type": "string"}},
      "points": {"type": "string", "enum": ["linear", "exponential"]} //// TODO: rodzaje punktacji
    }
  };
  var schema = {
    "id": "/test",
    "type": "object",
    "properties": {
    "title": {"type": "string"},
    "questions": {"type": "array", "items": {"$ref": "question"}
  }}}
  
  validator.addSchema(question, '/question');
  return validator.validate(json, schema).valid;
}
