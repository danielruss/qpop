var assert = chai.assert;

describe("Encodeing and decoding of text", function () {
  let txt = `The cat in the hat
is my favorite book`;
  let expectedEnc = "The cat in the hat\u001fis my favorite book";
  let encodedText = encodeNewLine(txt);
  let decodedText = decodeNewLine(encodedText);
  it("should encode newlines as char 31:", function () {
    assert.equal(encodedText, expectedEnc);
  });
  it("should be able to decode char 31 to a newline", function () {
    assert.equal(decodedText, txt);
  });
});

describe("Parse Questions", function () {
  it("should have question text with length > 0", function () {
    assert(questionText.length > 0);
  });
  it("should have 2 questions labeled Q1 and Q2", function () {
    let x = parseQuestions(questionText);
    assert(x.length == 2, "does not parse correctly");
  });
});
