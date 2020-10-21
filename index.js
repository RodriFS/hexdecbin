var base_convert = function (number, initial_base, change_base) {
  return parseInt(number + "", initial_base).toString(change_base);
};

const convert = {
  hex: {
    getElement: () => document.getElementById("hex"),
    base: 16,
  },
  bin: {
    getElement: () => document.getElementById("bin"),
    base: 2,
  },
  dec: {
    getElement: () => document.getElementById("dec"),
    base: 10,
  },
  twos: {
    getElement: () => document.getElementById("two"),
    base: 2,
  },
  bits: {
    getElement: () => document.getElementById("bits"),
  },
};

function from(regex, fromId, intoIds) {
  let fromTag = convert[fromId].getElement();
  let bits = convert["bits"].getElement().value;
  fromTag.value = fromTag.value
    .split("")
    .filter((char) => regex.test(char))
    .join("");
  if (regex.test(fromTag.value)) {
    for (toId of intoIds) {
      let toTag = convert[toId].getElement();
      let value = fromTag.value;
      if (toId === "twos") {
        value = (2 << (bits - 1)) - fromTag.value;
        if (value <= 0) {
          toTag.value = "Not enough bits";
          continue;
        }
      }
      toTag.value = base_convert(value, convert[fromId].base, convert[toId].base).toUpperCase();
    }
  } else {
    intoIds.forEach((toId) => {
      let toTag = convert[toId].getElement();
      toTag.value = "";
    });
  }
  let negative = document.getElementById("negative");
  negative.innerText = `(${-convert["dec"].getElement().value})`;
}

function fromHex() {
  from(new RegExp(/^[a-fA-F0-9]+$/), "hex", ["bin", "dec", "twos"]);
}

function fromBin() {
  from(new RegExp(/^[0-1]+$/), "bin", ["hex", "dec", "twos"]);
}

function fromDec() {
  from(new RegExp(/^[0-9]+$/), "dec", ["hex", "bin", "twos"]);
}
