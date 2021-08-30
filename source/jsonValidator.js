
module.exports = function (json){
  return new Promise((resolve) => {
    var Validator = require('jsonschema').Validator;
    var validator=  new Validator();
    var question = {
      "id": "/question",
      "type": "object",
      "required": ["type", "text", "tex"],
      "properties": {
        "type": {"type": "string", "enum": ["checkBox", "gridBox", "text", "list", "choice"]},
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
    resolve( validator.validate(json, schema).valid);
  });
}
