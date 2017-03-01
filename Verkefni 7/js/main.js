var div = document.createElement('div');
var h2 = document.createElement('h2');

div.className = "quiz";
document.body.appendChild(div);
div.appendChild(h2);
h2.innerHTML = ('QuizeMaster');
var ul = document.createElement('ul');
div.appendChild(ul)
var li = document.createElement('li');

function shuffleArray(array) {
 let m = array.length, t, i;
 // While there remain elements to shuffle…
 while (m) {
 // Pick a remaining element…
 i = Math.floor(Math.random() * m--);
 // And swap it with the current element.
 t = array[m];
 array[m] = array[i];
 array[i] = t;
 }
 return array;
}

function QuestionMaker(Question,choices,CorrectAns){
	this.Question = Question;
	this.choices = shuffleArray(choices);
	this.CorrectAns = CorrectAns;
}
var Question1 = new QuestionMaker("Stærsta land í heimi?",["Rússland","Kína","USA","Brazil"],"Rússland");
var Question2 = new QuestionMaker("Þetta er cool forrit?",["Já","Nei"],"Já");
var Question3 = new QuestionMaker("Subaru eða Honda?", ["Subaru","Honda"],"Honda");


var Questionar = [Question1,Question2,Question3];

function ShowQuestions(){
	var x = Math.round(Math.random() * + Math.abs(Questionar.length - 1))
	var li = document.createElement('li');
	ul.appendChild(li);
	var p = document.createElement('p');
	li.appendChild(p).innerHTML = Questionar[x]['Question'];
	for (var i = 0; i < Questionar[x]['choices'].length ; i++) {
		var li = document.createElement('li');
			li.className = "ABCD";
	ul.appendChild(li);
	var p = document.createElement('p');
	var abcd = ["A: ","B: ","C: ","D: "];
	li.appendChild(p).innerHTML = abcd[i] + Questionar[x]['choices'][i];
	};
	
}

ShowQuestions()