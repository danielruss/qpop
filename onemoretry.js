const questionRE = /\[([A-Z][\w]*)\](.*?)(?=\[[A-Z][\w]*\]|$)/g;

// convert newlines to record-separator symbol
function encodeNewLine(text) {
  return text.replace(/\n/g, "\u001f");
}

// convert copywrite back to newline
function decodeNewLine(text) {
  return text.replace(/\u001f/g, "\n");
}

function parseQuestions(text) {
  text = encodeNewLine(text);
  let found = text.matchAll(questionRE);
  // since the regex has 2 capture groups, there are 3
  // element in each array element...
  found = [...found].map((x) => {
    let a = {};
    a["origText"] = x[0];
    a["id"] = x[1];
    a["questionText"] = x[2].trim();
    return a;
  });
  return found;
}

function renderQuestion() {
  let question = questionTree.currentNode.value.question;
  let index = questionTree.currentNode.value.questionIndex;

  let renderedText = question.questionText;
  let lastQuestion = index + 1 >= questions.length;

  // convert |__|__| to an input type = number...
  let numInputRE = /\|__(\|__)+\|/g;
  renderedText = renderedText.replace(numInputRE, "<input type='number'>");

  // convert |__| to an input type = text
  let txtInputRE = /\|__\|/g;
  renderedText = renderedText.replace(numInputRE, "<input type='text'>");

  // convert (#) label to a radio button -- the label goes to EOL or next (#)
  let radioInputRE = /\((\d+)\)(.*?)(?=\(|)/g;
  renderedText = renderedText.replace(radioInputRE, (allText, value, label) => {
    console.log(value, label);
    return `<input type='radio' name=${question.id} value=${value}>`;
  });

  let prevButtonId = question.id + "_prevButton";
  let prevButtonHTML = questionTree.isFirst() ? "" : "<input id=" + prevButtonId + " type='button' value='Prev'>";
  let nextButtonHTML = "<input type='submit' value='Next'>";
  renderedText = `${lastQuestion}: ${questionTree.currentNode.value.questionIndex + 1} out of ${questions.length}<br><form id=${
    question.id
  }>${renderedText} ${prevButtonHTML} ${nextButtonHTML}</form>`;

  document.getElementById("quest").innerHTML = renderedText;
  if (!questionTree.isFirst()) {
    document.getElementById(prevButtonId).onclick = previousClicked;
  }
  if (!lastQuestion) {
    document.getElementById(question.id).onsubmit = nextClicked;
  } else {
    // handle end-of-survey
    document.getElementById(question.id).onsubmit = allDone;
  }
}

let questions = [];
let results = {};
let questionTree = new Tree();

function nextClicked(event) {
  event.preventDefault();
  // collect responses...
  let res = collectResponses(event);

  // goto next...
  renderNextQuestion(res);
}

function previousClicked(event) {
  renderPreviousQuestion();
}

function allDone(event) {
  event.preventDefault();
  let renderedText = "Thank for taking this survey, have a nice day...";
  document.getElementById("quest").innerHTML = renderedText;
}
function renderNextQuestion(res, event) {
  if (!questionTree.next()) {
    // get the next index of the next question in the list
    let nextIndex = questionTree.currentNode.value.questionIndex + 1;
    // add the next question to the tree
    questionTree.setChildren({ questionIndex: nextIndex, question: questions[nextIndex] });
    // make the next question the current question...
    questionTree.next();
  }
  renderQuestion();
}

function renderPreviousQuestion() {
  questionTree.previous();
  renderQuestion();
}

function collectResponses(event) {
  questionResult = {};
  let inputElements = [...event.target.querySelectorAll("input")];

  inputElements.forEach((element) => {
    // if the element is either a radio or checkbox...
    if (["radio", "checkbox"].includes(element.type)) {
      if (!questionResult.hasOwnProperty(event.target.id)) {
        questionResult[event.target.id] = [];
      }
      if (element.checked) {
        questionResult[event.target.id].push(element.value);
      }
    }
  });
  return questionResult;
}

window.onload = function () {
  // display first question...
  questions = parseQuestions(questionText);

  if (questions.length > 0) {
    if (questionTree.isAtRoot()) {
      // add the first question to the tree...
      questionTree.setChildren({ questionIndex: 0, question: questions[0] });
      // render the initial question
      renderNextQuestion({}, null);
      document.getElementById(questions[0].id).onsubmit = nextClicked;
    } else {
      this.renderQuestion();
    }
  } else {
    document.getElementById("quest").innerHTML = "No questions found...";
  }
};
