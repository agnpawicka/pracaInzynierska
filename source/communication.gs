//Pliz zawierający implementację komunikacji z zewnętrznymi aplikacjami

//Metoda doGet jest wywoływana przy żadaniach GET. W niniejszej aplikacji służy do zarządzania istniejącymi formularzami.
function doGet(e) {
  if(e.parameter.formId!= null){
    let formId = e.parameter.formId;
    var form = FormApp.openById(formId);
    var ret;
    Logger.log(e.parameter.action);
    switch(e.parameter.action){
      case "isActive":
        if(form.isAcceptingResponses()){
          ret="Form is active"
        }
        else ret="Form is inactive"
        break;
      case "activate":
        form.setAcceptingResponses(true);
        ret = "Form activated";
        break;
      case "deactivate":
        form.setAcceptingResponses(false);
        ret  = "Form deactivated";
        break;
      case "publisherUrl":
        ret = form.getPublishedUrl();
        break;
      case "editorUrl":
        ret = form.getEditUrl();
        break;
     case "delete":
        form.setAcceptingResponses(false);
        ret = "Form deactivated, please reload page."
        break;
      default:
        ret = "Something went wrong";
    }
    Logger.log( ContentService.createTextOutput(ret).setMimeType(ContentService.MimeType.TEXT));
    return ContentService.createTextOutput(ret).setMimeType(ContentService.MimeType.TEXT);
  }
}


//Metoda doPost jest wywoływana przy żadaniach POST. W niniejszej aplikacji służy do tworzenia nowych formularzy
function doPost(e){
  Logger.log(e.postData.contents);
  var json= JSON.parse(e.postData.contents);
  var formId = createFromJSON(json);
  return ContentService.createTextOutput(formId).setMimeType(ContentService.MimeType.TEXT);

}
