
module.exports = function (json){

  var Validator = require('jsonschema').Validator;
  var validator=  new Validator();
  var question = {
    "id": "/question",
    "type": "object",
    "required": ["type", "text", "tex"],
    "properties": {
      "type": {"type": "string", "enum": ["checkBox"]}, //// TODO:  rodzaje pytań
      "text": {"type": "string"},
      "tex": {"type": "boolean"},
      "answers": { "type": "array", "items" : {
        "answer" : {"type" : "string"},
        "correct" : {"type" : "boolean"}
        }
      },
      "points": {"type": "number"}
    }
  };
  var schema = {
    "id": "/schema",
    "type": "object",
    "required": ["title", "questions"],
    "properties": {
    "title": {"type": "string"},
    "email": {"type": "string"},
    "check": {"type": "boolean"},
    "questions": {"type": "array", "items": {"$ref": "question"}
  }}}

  validator.addSchema(question, '/question');
  //console.log(validator.validate(json, schema));
  return validator.validate(json, schema).valid;
}
