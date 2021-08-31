/*Plik zawiera implementację metod służących do generowania formularzy.
 */

//Metoda checkBox dodaje do formularza 'form' pytanie typu 'checkBox'
function checkBox(form, question){
  var item ;
  if(question.tex){
    image(form, question.text);
    item = form.addCheckboxItem();
  }
  else {
    item = form.addCheckboxItem();
    item.setTitle(question.text);
  }
  var choices = question.answers;
  for(i in choices) if(choices[i].correct != true) choices[i].correct=false;
  for(let i=0; i<choices.length; i++) choices[i]=item.createChoice(choices[i].answer, choices[i].correct);
  item.setChoices(choices);
  if(form.isQuiz()) item.setPoints(question.points);
}



//Metoda grid dodaje do formularza 'form' pytanie typu 'grid' o kolumnach typu prawda/fałsz
function grid(form, question){
  var item ;
  if(question.tex){
    image(form, question.text);
    item = form.addGridItem();
  }
  else {
    item = form.addGridItem();
    item.setTitle(question.text);
  }
  var choices = question.answers;
   for(i in choices) if(choices[i].correct != true) choices[i].correct=false;
  for(let i=0; i<choices.length; i++) choices[i]=choices[i].answer;
  item.setRows(choices).setColumns(['True/Prawda', 'False/Fałsz']);
  if(form.isQuiz()) item.setPoints(question.points);
}


//Metoda image dodaje dp fomrularza zdjęcie zakodowane w base64

function image(form, base64){
  var decoded = Utilities.base64Decode(base64);
  var img = Utilities.newBlob(decoded, MimeType.JPEG, "nameOfImage");
  form.addImageItem()
       .setImage(img);

}


//Metoda list dodaje do formularza 'form' pytanie typu 'list'
function list(form, question){

  var item ;
   if(question.tex){
    image(form, question.text);
    item = form.addListItem();
  }
  else {
    item= form.addListItem();
    item.setTitle(question.text);
  }
  var choices = question.answers;
   for(i in choices) if(choices[i].correct != true) choices[i].correct=false;
  for(let i=0; i<choices.length; i++) choices[i]=item.createChoice(choices[i].answer, choices[i].correct);
  item.setChoices(choices);
  if(form.isQuiz()) item.setPoints(question.points);

}



//Metoda text dodaje do formularza 'form' pytanie typu 'text'
function text(form, question){
  var item;
    if(question.tex){
    image(form, question.text);
    item = form.addTextItem();
  }
  else {
    item= item = form.addTextItem();
  item.setTitle(question.text);
  }
  if(form.isQuiz()) item.setPoints(question.points);
}


//Metoda setFormFeatures ustawia własności formularza
function setFormFeatures(form, json){
  form.setAllowResponseEdits(false);
  form.setCollectEmail(true);
 // form.setRequireLogin(true); This feature is available only for forms created by Google Workspace users. Users of other types of Google accounts can't be required to log in.
  form.setLimitOneResponsePerUser(true);
  if(json.email != null){
    form.addEditor(json.email);
  }
  if(json.check != null){
    form.setIsQuiz(json.check);
  }
}


//Metoda createFromJSON jest odpowiedzialna za stworzenie formularza oraz wywoływanie poprzednich metod w odpowiedniej kolejności
function createFromJSON(json) {
var form = FormApp.create(json.title);
setFormFeatures(form, json);
var questions = json.questions;
for( let it =0; it<questions.length; it++){

  let type = questions[it].type;
   Logger.log('type: '+ type);
  switch(type){

    case 'checkBox':
      checkBox(form, questions[it]);

    break;
    case 'grid':
    grid(form, questions[it]);
    break;
    case 'list':
    list(form, questions[it]);
    break;
    case 'text':
    text(form, questions[it]);
    break;
  }
}
//TODO: other types to questions.
Logger.log('Published URL: ' + form.getPublishedUrl());
Logger.log('Editor URL: ' + form.getEditUrl());
return form.getId();

}
