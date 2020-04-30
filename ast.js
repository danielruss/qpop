const knownFunctions = {
  and: function(x, y) {
    return x && y;
  },
  or: function(x, y) {
    return x || y;
  },
  equals: function(x, y) {
    return x == y;
  },
  lessThan: function(x, y) {
    return x < y;
  },
  lessThanOrEqual: function(x, y) {
    return x <= y;
  },
  greaterThan: function(x, y) {
    return x > y;
  },
  greaterThanOrEqual: function(x, y) {
    return x >= y;
  }
};

function testAnd() {
  console.log("======== AND");
  console.log("T T: ", knownFunctions.and(true, true));
  console.log("T F: ", knownFunctions.and(true, false));
  console.log("F T: ", knownFunctions.and(false, true));
  console.log("F F: ", knownFunctions.and(false, false));
  console.log("======== OR");
  console.log("T T: ", knownFunctions.or(true, true));
  console.log("T F: ", knownFunctions.or(true, false));
  console.log("F T: ", knownFunctions.or(false, true));
  console.log("F F: ", knownFunctions.or(false, false));
  console.log("======== equals");
  console.log("A B: ", knownFunctions.equals("A", "B"));
  console.log("A A: ", knownFunctions.equals("A", "A"));
  console.log("B A: ", knownFunctions.equals("B", "A"));
  console.log("B B: ", knownFunctions.equals("B", "B"));
}

function parse(txt) {
  //https://stackoverflow.com/questions/6323417/regex-to-extract-all-matches-from-string-using-regexp-exec
  var re = /[\(\),]/g;
  var stack = [];
  var lastMatch = 0;
  for (const match of txt.matchAll(re)) {
    stack.push(match.input.substr(lastMatch, match.index - lastMatch));
    stack.push(match.input.charAt(match.index));
    lastMatch = match.index + 1;
  }
  // remove all blanks...
  stack = stack.filter(x => x != "");

  while (stack.indexOf(")") > 0) {
    var callEnd = stack.indexOf(")");
    if (
      stack[callEnd - 4] == "(" &&
      stack[callEnd - 2] == "," &&
      stack[callEnd - 5] in knownFunctions
    ) {
      // it might hurt performance, but for debugging
      // expliciting setting the variables are helpful...
      fun = stack[callEnd - 5];
      arg1 = stack[callEnd - 3];
      // arg1 one should be a id or a boolean...
      // either from a element in the document or
      // from the currently undefined last module...
      if (typeof arg1 === "string") {
        var element = document.getElementById(arg1);
        // if element is null, look it up in the
        // previous module...
        arg1 = document.getElementById(arg1).value;
      }
      arg2 = stack[callEnd - 1];
      console.log(
        fun + "(" + arg1 + "," + arg2 + ") =",
        knownFunctions[fun](arg1, arg2)
      );
      var tmpValue = knownFunctions[fun](arg1, arg2);
      // replace from callEnd-5 to callEnd with  the results...
      // splice start at callEnd-5, remove 6, add the calculated value...
      stack.splice(callEnd - 5, 6, tmpValue);
    } else {
      return console.log("problem!!!");
    }
  }
  return stack[0];
}

function handleCall(value, index, array) {
  console.log(value, index, array);
}
