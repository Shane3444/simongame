function makeSound(key) {
  switch (key) {
    case 'green':
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case 'red':
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case 'yellow':
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case 'blue':
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case 'wrong':
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;
    default:
      console.log("nothing happened");
  }
}

function nextSeq() {
  $("#level-title").text("Level "+ level);
  element = arr[Math.floor((Math.random() * 4))];
  seq.push(element);
  makeSound(element);
  $("#" + element).fadeIn(100).fadeOut(100).fadeIn(100);
  console.log(seq);
}

function checkSeq(seq, curseq) {
  for (var i = 0; i < seq.length; i++) {
    if (seq[i] != curseq[i]) {
      flag = 0;
    }
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

var flag = 1;
var level = 0;
var check = 0;
var seq = [];
var curseq = [];
const arr = ["green","red","yellow","blue"];
var started = false;

$(".btn").click(function(event){
  var item = this.id;
  makeSound(item);
  animatePress(item);
  curseq.push(item);
  if (curseq.length === seq.length) {
    checkSeq(seq, curseq);
    if (flag == 0) {
      $("#level-title").text('Game Over, Press Any Key to Restart');
      makeSound('wrong');
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      seq = [];
      curseq = [];
      level = 0;
      started = false;
      flag = 1;
    }
    else {
      setTimeout(function () {
        level = level + 1;
        curseq = [];
        nextSeq();
      }, 1000);
    }
  }
});

$(document).keypress(function() {
  if (!started){
    level = level + 1;
    nextSeq();
    started = true;
  }
});
