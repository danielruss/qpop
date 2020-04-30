var assert = require("assert");
describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

var tt = require("../onemoretry.js");
describe("EncodeDecodeText", function () {
  let orig = `The cat in the hat
is my favorite story`;
  let enc = "The cat in the hat" + String.fromCharCode(31) + "is my favorite story";
  let encoded = tt.encodeNewLine(orig);
  let decoded = tt.decodeNewLine(encoded);
  it("should encode properly", function () {
    assert.equal(encoded, enc);
  });
  it("should decode properly", function () {
    assert.equal(decoded, orig);
  });
});
