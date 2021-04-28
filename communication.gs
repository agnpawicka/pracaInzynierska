function doGet(e) {
  Logger.log(e.parameters);
  var json= JSON.parse(e.parameters.encoded);
  var publisherUrl = createFromJSON(json);
  return ContentService.createTextOutput(publisherUrl).setMimeType(ContentService.MimeType.TEXT);

}

function doPost(e){

}
