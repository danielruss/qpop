function buttonClicked(myButton) {
  if (myButton.hasAttribute("data-toggle")) {
    myButton.removeAttribute("data-toggle");
  }

  let ok = document.getElementById("checkme").checked;

  if (!ok) {
    myButton.setAttribute("data-toggle", "modal");
    myButton.setAttribute("data-target", "#exampleModal");
  }
  console.log(document.getElementById("checkme"));
}

function gotonext(x) {
  console.log("gotonext: ", x);
}

