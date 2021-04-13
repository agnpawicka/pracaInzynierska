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
  var item = form.addCheckboxItem();
  item.setTitle(question.title);
    var choices = question.table;
  for(let i=0; i<choices.length; i++) choices[i]=item.createChoice(choices[i]);
  item.setChoices(choices);
}


/**
 * @function gridBox
 */
function gridBox(form, question){
   var item = form.addCheckboxItem();
   item.setTitle(question.title);
    var choices = question.table;
  for(let i=0; i<choices.length; i++) choices[i]=item.createChoice(choices[i]);
  item.setChoices(choices);
}

function choice(form, question){
    var item = form.addMultipleChoiceItem();
    item.setTitle(question.title)
    .setChoices([
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

function image(form, question){


}


/**
 *
 */
function list(form, question){

  var item = form.addListItem();
  var choices = question.answers;
  for(let i=0; i<choices.length; i++) choices[i]=item.createChoice(choices[i]);
  item.setTitle(question.title)
    .setChoices(choices);

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

function createFromJSON() {// Create a new form from json
var form = FormApp.create('New Form'); //TODO add title
const json = '{"questions": [{"type": "checkBox", "text": "opcjeListy", "answers": ["jedna", "druga", "trzecia"] }]}'; // TODO json file as argument
var questions = (JSON.parse(json)).questions;
//Logger.log(questions);
//Logger.log(questions.);
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
//TODO: json to questions.
Logger.log('Published URL: ' + form.getPublishedUrl());
Logger.log('Editor URL: ' + form.getEditUrl());

}
