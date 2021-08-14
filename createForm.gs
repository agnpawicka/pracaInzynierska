/**
 * @file createForm.gs
 * Set of functions for creating Google Form from JSON file
 */



/** @function checkBox - Function creates a checkBox question.
 * @param form - reference to a form
 * @param question - parsed json, question data
 *
*/

function checkBox(form, question){ // wielokrotny wybór
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
  for(let i=0; i<choices.length; i++) choices[i]=item.createChoice(choices[i]);
  item.setChoices(choices);
}


/**
 * @function gridBox
 */
function gridBox(form, question){
  var item;
   if(question.tex){
    image(form, question.text);
    item  = form.addGridboxItem();
  }
  else {
    item = form.addGridboxItem();
    item.setTitle(question.text);
  }
  var choices = question.answers;
  for(let i=0; i<choices.length; i++) choices[i]=item.createChoice(choices[i]);
  item.setChoices(choices);
}

function choice(form, question){
    var item ;
     if(question.tex){
    image(form, question.text);
    item  = form.addMultipleChoiceItem();
   }
    else {
      item = form.addMultipleChoiceItem();
     item.setTitle(question.text);
    }
    item.setChoices([
        item.createChoice('Cats', FormApp.PageNavigationType.CONTINUE),
        item.createChoice('Dogs', FormApp.PageNavigationType.RESTART)
    ]);

}

function date(form, question){


}

function dateTime(form, question){


}
function date(form, question){


}

function dateTime(form, question){


}
function duration(form, question){

}

function grid(form, question){


}

function image(form, base64){
  var decoded = Utilities.base64Decode(base64);
  var img = Utilities.newBlob(decoded, MimeType.JPEG, "nameOfImage");
  form.addImageItem()
       .setImage(img);

}

/**
 *
 */
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
  for(let i=0; i<choices.length; i++) choices[i]=item.createChoice(choices[i]);
  itemsetChoices(choices);

}
function multipleChoice(form, question){


}

function pageBreak(form, question){

}
function paragraphText(form, question){

}
function scale(form, question){

}
function sectionHeader(form, question){

}
function text(form, question){

}
 function time(form, question){


}

function video(form, question){

}

function createFromJSON(json) {// Create a new form from json
var form = FormApp.create(json.title);
var questions = json.questions;
for( let it =0; it<questions.length; it++){

  let type = questions[it].type;
   Logger.log('type: '+ type);
  switch(type){

    case 'checkBox':
      checkBox(form, questions[it]);

    break;
    case 'gridBox':
    gridBox(form, questions[it]);
    break;
    case 'list':
    list(form, questions[it]);
    break;
  }
}
//TODO: other types to questions.
Logger.log('Published URL: ' + form.getPublishedUrl());
Logger.log('Editor URL: ' + form.getEditUrl());
return form.getPublishedUrl();

}
