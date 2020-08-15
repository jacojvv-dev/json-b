# json-b

An extremely naive and bad implementation that attempts to reduce the overall size of JSON data.

It attempts to save data by taking this

```json
[
  {
    "propertyOne": "valueOne",
    "propertyTwo": "valueTwo",
    "propertyThree": "valueThree",
    "propertyFour": {
        "ChildOne": 1,
        "ChildTwo": false,
        "ChildThree": "E"
    }
  },
  {
    "propertyOne": "valueOne",
    "propertyTwo": "valueTwo",
    "propertyThree": "valueThree",
    "propertyFour": {
        "ChildOne": 1,
        "ChildTwo": false,
        "ChildThree": "E"
    }
  },
  {
    "propertyOne": "valueOne",
    "propertyTwo": "valueTwo",
    "propertyThree": "valueThree",
    "propertyFour": {
        "ChildOne": 1,
        "ChildTwo": false,
        "ChildThree": "E"
    }
  }
  ...
]
```

and turning it into this

```json
//jsonb//
{"1":"propertyOne", "2": "propertyTwo", "3": "propertyThree", "4": "propertyFour", "4.1": "ChildOne", "4.2": "ChildTwo", "4.3": "ChildThree"}
//jsonb//
[
  {
    "1": "valueOne",
    "2": "valueTwo",
    "3": "valueThree",
    "4": {
        "4.1": 1,
        "4.2": false,
        "4.3": "E"
    }
  },
  {
    "1": "valueOne",
    "2": "valueTwo",
    "3": "valueThree",
    "4": {
        "4.1": 1,
        "4.2": false,
        "4.3": "E"
    }
  },
  {
    "1": "valueOne",
    "2": "valueTwo",
    "3": "valueThree",
    "4": {
        "4.1": 1,
        "4.2": false,
        "4.3": "E"
    }
  }
  ...
]
```
