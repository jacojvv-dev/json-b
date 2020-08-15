isObject = (val) => {
  if (val === null) {
    return false;
  }
  return typeof val === "function" || typeof val === "object";
};

isObjectOrArray = (val) => {
  if (val === null) {
    return false;
  }
  return (
    typeof val === "function" ||
    typeof val === "object" ||
    typeof val === "array"
  );
};

extractMap = (object, parent = "") => {
  let keys = {};
  let dataSet = isObject(object) && object.length ? object : [object];

  // iterate over every item in the collection to ensure we get all the possible keys
  for (let i = 0; i < dataSet.length; i++) {
    const element = dataSet[i];
    // iterate over every key in every object of the collection to build a map of all the keys
    for (const key in element) {
      if (element.hasOwnProperty(key)) {
        let newKey = `${parent ? parent + "." : ""}${
          Object.keys(keys).length + 1
        }`;

        // if the value exists in the output keys - we don't need to add it again
        // this also means that if a property only exists in a object that is defined later
        // it won't be mapped here - for POC I am not going to be too stressed
        if (Object.values(keys).indexOf(key) === -1) {
          keys[newKey] = key;

          if (isObjectOrArray(element[key])) {
            let nestedKeys = extractMap(element[key], newKey);
            keys = { ...keys, ...nestedKeys };
          }
        }
      }
    }
  }

  return keys;
};

reverseObject = (obj) =>
  Object.assign({}, ...Object.entries(obj).map(([a, b]) => ({ [b]: a })));

renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};

class JSONB {
  static parse(data) {
    throw new Exception("parse is not implemented");
  }

  static stringify(value) {
    const keys = extractMap(value);
    const renameMap = reverseObject(keys);

    for (let i = 0; i < value.length; i++) {
      value[i] = renameKeys(value[i], renameMap);
      for (const key in value[i]) {
        if (value[i].hasOwnProperty(key)) {
          if (isObject(value[i][key])) {
            value[i][key] = renameKeys(value[i][key], renameMap);
          }
        }
      }
    }

    return `//jsonb//\n${JSON.stringify(keys)}\n//jsonb//\n${JSON.stringify(
      value
    )}`;
  }
}

module.exports = JSONB;
