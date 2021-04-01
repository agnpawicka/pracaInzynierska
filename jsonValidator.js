function jsonValidate(json){
  var Validator = require('jsonschema').Validator;
  var validator = new Validator();


  var question = {
    "id": "/question",
    "type": "object",
    "properties": {
      "question_type": {"type": "string", "enum": ["checkbox"]}, //// TODO:  rodzaje pytań
      "text": {"type": "string"},
      "tex": {"type": "string"},
      "answers": {"type": "array", "items": "string"}
      "points": {"type": "string", "enum": ["linear", "exponential"]} //// TODO: rodzaje punktacji
    }
  }
  var schema = {
    "id": "/test",
    "type": "object",
    "properties": {
    "title": {"type": "string"},
    "questions": {"type": "array", "items": {"$ref": "/question"}
  }

  };


  validator.addSchema(schema, '/test');
  return validator.validate(json, schema);
}
