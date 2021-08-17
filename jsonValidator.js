
module.exports = function (json){

  var Validator = require('jsonschema').Validator;
  var validator=  new Validator();
  var answer = {
    "id" : "/answer",
    "type" : "object",
    "properties" : {
      "answer" : {"type" : "string"},
      "correct" : {"type" : "boolean"}
    }
  };
  var question = {
    "id": "/question",
    "type": "object",
    "properties": {
      "type": {"type": "string", "enum": ["checkBox"]}, //// TODO:  rodzaje pytań
      "text": {"type": "string"},
      "tex": {"type": "boolean"},
      "answers": {
        "answer" : {"type" : "string"},
        "correct" : {"type" : "boolean"}
      },
      "points": {"type": "number"} //// TODO: rodzaje punktacji
    }
  };
  var schema = {
    "id": "/test",
    "type": "object",
    "properties": {
    "title": {"type": "string"},
    "questions": {"type": "array", "items": {"$ref": "question"}
  }}}

//  validator.addSchema(answer, '/answer');
  validator.addSchema(question, '/question');
  return validator.validate(json, schema).valid;
}
