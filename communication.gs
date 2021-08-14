function doGet(e) {

}

function doPost(e){
  Logger.log(e.postData.contents);
  var json= JSON.parse(e.postData.contents);
  var publisherUrl = createFromJSON(json);
  return ContentService.createTextOutput(publisherUrl).setMimeType(ContentService.MimeType.TEXT);

}
