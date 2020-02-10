// x is the questionnaire text
function unrollLoops(txt) {
  // all the questions in the loops...
  let loopRegex = /<loop max=(\d+)\s*>(.*?)<\/loop>/gms;
  let res = [...txt.matchAll(loopRegex)].map(function(x) {
    return { cnt: x[1], txt: x[2], orig: x[0] };
  });

  let idRegex = /\[(\w+)[?!]?\]/gms;
  // we have an array of objects holding the text..
  // get all the ids...

  let cleanedText = res.map(function(x) {
    let ids = [...x.txt.matchAll(idRegex)].map(x => ({
      label: x[0],
      id: x[1]
    }));

    // goto from 1-> max for human consumption... need <=
    let loopText = "";
    for (var loopIndx = 1; loopIndx <= x.cnt; loopIndx++) {
      loopText = loopText + "\n" + x.txt;
      // replace all instances of the question ids with id_#
      ids.map(
        id =>
          (loopText = loopText.replace(
            id.label,
            id.label.replace(id.id, id.id + "_" + loopIndx)
          ))
      );
      // replace all -> Id with -> Id_#
      ids.map(
        id =>
          (loopText = loopText.replace(
            new RegExp("->\\s*" + id.id + "\\W"),
            "-> " + id.id + "_" + loopIndx + " "
          ))
      );
    }
    return loopText;
  });

  for (var loopIndx = 0; loopIndx < cleanedText.length; loopIndx++) {
    txt = txt.replace(res[loopIndx].orig, cleanedText[loopIndx]);
  }
  return txt;
}
