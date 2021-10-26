# Data Models
## `Inventory` Sample Document

```
{
  "_id": {
    "$oid": "61780b85d28f5b8f68cb785b"
  },
  "Brand Label Serial Number": "5114712",
  "Brand Label Name": "TULLAMORE DEW 12 YR SPECIAL RES 80PF",
  "License Type Code": "652",
  "License Class Code": "2",
  "License Class Description": "WHISKEY",
  "Product Description": "IRISH WHISKY",
  "Wholesaler License Serial Number": "1263546",
  "Wholesaler Name": "WILLIAM GRANT & SONS INC",
  "Domestic (D) or Imported (I)": "I",
  "Brand Label Expiration Date": "2019-09-30T00:00:00.000",
  "volumeInOz": {
    "$numberDouble": "23.67"
  },
  "location": {
    "barName": "MooMba Beach Bar & Restaurant",
    "geo": [
      {
        "$numberDouble": "-70.05551129837323"
      },
      {
        "$numberDouble": "12.58224079198876"
      }
    ]
  }
}
```

## `Pours` Sample Document (Time Series)
```
{
  "pourTime": {
    "$date": {
      "$numberLong": "1633132583667"
    }
  },
  "bottle": {
    "Brand Label Name": "ARISTOCRAT LIQUEURS 30PF",
    "bottleId": {
      "$numberInt": "1092"
    }
  },
  "ouncesRemaing": {
    "$numberInt": "8"
  },
  "pourOunces": {
    "$numberInt": "2"
  },
  "_id": {
    "$oid": "61783ad464c23a581ed7ef4f"
  }
}
```

## `BottleReadingTemp` Realm Object
```
public class BottleReadingTemp : RealmObject
        {
            [PrimaryKey]
            [MapTo("_id")]
            public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

            [MapTo("bottleId")]
            public string BottleId { get; set; }
            [MapTo("bottleContents")]
            public string Contents { get; set; }
            [MapTo("pourSize")]
            public int Pour { get; set; }
            [MapTo("remaining")]
            public int Remaining { get; set; }
        }
```

## `BottleReadingTemp` Sample Document
```
{
  "_id": {
    "$oid": "6178357fd660e7559ec86e52"
  },
  "_pk": "user=6178141d68f275f84ecafe2c",
  "bottleContents": "TULLAMORE DEW 12 YR SPECIAL RES 80PF",
  "bottleId": "8001",
  "pourSize": {
    "$numberLong": "1"
  },
  "remaining": {
    "$numberLong": "2"
  }
}
```

## Data flow
![](Assets/UML.png)