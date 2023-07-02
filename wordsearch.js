/* import copy
import random */

const upper = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const length = 10;
const width = 10;
const random = {};
random.randint = function (min, max) {
  c = Math.floor(Math.random() * (max - min + 1)) + min;
  return c;
};

function range(size, startAt = 0) {  return [...Array(size).keys()].map((i) => i + startAt);}

function arrayRandom(array) {  return array[Math.floor(Math.random() * array.length)];}
const deepCopyFunction = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};
function gen(l, w, words) {
  //Empty
  let mainWS = [];  for (const i of range(l)) {    const e = [];    for (const j of range(w)) {      e.push(arrayRandom(upper));    }    mainWS.push(e);  }

  //Fill words
  let mainWScopy = deepCopyFunction(mainWS);

  function putWords(mainWS, words) {
    words.forEach((word) => {
      if (arrayRandom([0, 1]) == 0) word = word.split("").reverse().join("");
      word = word;
      let vert = true;
      let hori = true;
      if (word.length > l) vert = false;
      if (word.lngth > w) hori = false;
      if (!(hori || vert)) throw new Error("Stoopid idot");
      let rows = l - word.length;
      let columns = w - word.length;
      if (!(hori || vert)) {
        if (hori) direction = 0;
        else direction = 1;
      } else direction = arrayRandom([0, 1, 2]);
      // 0 - Horizontal
      // 1 - Vertical
      // 2 - Diagonal
      if (direction == 0) {
        let count = 0;
        function fillWord(wor, r, c, ws, count) {
          if (count >= 50) {
            mainWS = deepCopyFunction(mainWScopy);
            return putWords(mainWS, words);
          }
          let row = random.randint(0, l - 1);
          let column = random.randint(0, c);
          if (checkWord(wor, direction, row, column, ws)) {
            for (let i of range(wor.length)) {
              ws[row][column + i] = wor[i];
              used.push([row, column + i]);
            }
          } else {
            count += 1;
            fillWord(wor, r, c, ws, count);
          }
        }
        fillWord(word, rows, columns, mainWS, count);
      } else if (direction == 1) {
        let count = 0;

        function fillWord(wor, r, c, ws, count) {
          if (count >= 50) {
            mainWS = deepCopyFunction(mainWScopy);
            return putWords(mainWS, words);
          }
          let row = random.randint(0, r);
          let column = random.randint(0, w - 1);
          if (checkWord(wor, direction, row, column, ws)) {
            for (i of range(wor.length)) {
              ws[row + i][column] = word[i];
              used.push([row + i, column]);
            }
          } else {
            count += 1;
            fillWord(wor, r, c, ws, count);
          }
        }
        fillWord(word, rows, columns, mainWS, count);
      } else if (direction == 2) {
        let count = 0;
        function fillWord(wor, r, c, ws, count) {
          if (count >= 50) {
            mainWS = deepCopyFunction(mainWScopy);
            return putWords(mainWS, words);
          }
          let row = random.randint(0, r);
          let column = random.randint(0, c);
          if (checkWord(wor, direction, row, column, ws)) {
            for (i of range(wor.length)) {
              ws[row + i][column + i] = word[i];
              used.push([row + i, column + i]);
            }
          } else {
            count += 1;
            fillWord(wor, r, c, ws, count);
          }
        }
        fillWord(word, rows, columns, mainWS, count);
      }
    });
  }

  putWords(mainWS, words);
  return mainWS;
}
function show(t) {  console.log("\n");  t.forEach((i) => {    console.log(i.join(" "));  });}

used = [];

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}
function checkFine(letter, r, c, ws) {
  console.log(letter == ws[r][c] || !used.some((e) => arrayEquals(e, [r, c])));
  return letter == ws[r][c] || !used.some((e) => arrayEquals(e, [r, c]));
}

function checkWord(word, direction, start_r, start_c, ws) {
  if (direction == 0) {
    for (i of range(word.length)) {
      if (!checkFine(word[i], start_r, start_c + i, ws)) {
        return false;
      }
      return true;
    }
  } else if (direction == 1) {
    for (i of range(word.length)) {
      if (!checkFine(word[i], start_r + i, start_c, ws)) {
        return false;
      }
    }
    return true;
  } else if (direction == 2) {
    for (i of range(word.length)) {
      if (!checkFine(word[i], start_r + i, start_c + i, ws)) {
        return false;
      }
      return true;
    }
  }
}
show(
  gen(15, 15, [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
  ])
);
