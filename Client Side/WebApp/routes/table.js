const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const dburl = 'mongodb+srv://santin:Sanshev123@cluster0-8wria.mongodb.net/BSE?retryWrites=true&w=majority';
var MongoClient = require('mongodb').MongoClient;
const dbname = 'BSE';


//@route    GET route/table
//@desc     get mutualfunds
//@access   Public

router.get('/mutualfunds', async (req, res) => {
  // connect to DB
  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('mutual_funds');

      // Find all documents in the collection
      collection.find({}).toArray(function (err, cas) {
        if (!err) {

          // send output back
          return res.send(cas);

          // log data to the console as well
          //console.log(todos);
        }
      });

    }
  });
});

//@route    GET route/table
//@desc     get mutualfunds
//@access   Public

router.get('/scrapper', async (req, res) => {
  // connect to DB
  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('BSE.25/07/2020-E');

      // Find all documents in the collection
      collection.find({}).toArray(function (err, cas) {
        if (!err) {

          // send output back
          return res.send(cas);

          // log data to the console as well
          //console.log(todos);
        }
      });

    }
  });
});

//@route    POST route/table
//@desc     post mutualfunds
//@access   Public

router.post('/mutualfunds', async (req, res) => {
  // connect to DB
  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('mutual_funds');

      // Find all documents in the collection
      collection.insertOne(req.body, function (err, result) {
        console.log("Inserted 3 documents into the collection");
        return (result)
      });

    }
  });
});


//@route    POST route/table
//@desc     post dividend
//@access   Public

router.post('/dividend', async (req, res) => {
  // connect to DB
  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('equity');

      // Find all documents in the collection
      collection.insertOne(req.body, function (err, result) {
        console.log("Inserted 3 documents into the collection");
        return (result)
      });

    }
  });
});

//@route    POST route/table
//@desc     post dividend
//@access   Public

router.post('/scrapper', async (req, res) => {
  // connect to DB
  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('BSE.25/07/2020-E');

      // Find all documents in the collection
      collection.insertOne(req.body, function (err, result) {
        console.log("Inserted 3 documents into the collection");
        return (result)
      });

    }
  });
});


//@route    POST route/table
//@desc     post splits
//@access   Public

router.post('/splits', async (req, res) => {
  // connect to DB
  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('split');

      // Find all documents in the collection
      collection.insertOne(req.body, function (err, result) {
        console.log("Inserted 3 documents into the collection");
        return (result)
      });

    }
  });
});

//@route    POST route/table
//@desc     post splits
//@access   Public

router.post('/bcdate', async (req, res) => {
  // connect to DB
  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('bc_date');

      // Find all documents in the collection
      collection.insertOne(req.body, function (err, result) {
        console.log("Inserted 3 documents into the collection");
        return (result)
      });

    }
  });
});



//@route    GET route/table
//@desc     get dividends
//@access   Public

router.get('/dividend', async (req, res) => {
  // connect to DB
  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('equity');

      // Find all documents in the collection
      collection.find({}).toArray(function (err, cas) {
        if (!err) {

          // send output back
          return res.send(cas);

          // log data to the console as well
          //console.log(todos);
        }
      });

    }
  });
});



//@route    GET route/table
//@desc     get dividends
//@access   Public

router.get('/splits', async (req, res) => {
  // connect to DB
  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('split');

      // Find all documents in the collection
      collection.find({}).toArray(function (err, cas) {
        if (!err) {

          // send output back
          return res.send(cas);

          // log data to the console as well
          //console.log(todos);
        }
      });

    }
  });
});


//@route    GET route/table
//@desc     get bc dates
//@access   Public

router.get('/bcdate', async (req, res) => {
  // connect to DB
  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('bc_date');

      // Find all documents in the collection
      collection.find({}).toArray(function (err, cas) {
        if (!err) {

          // send output back
          return res.send(cas);

          // log data to the console as well
          //console.log(todos);
        }
      });

    }
  });
});

//@route    GET route/table
//@desc     get bc dates
//@access   Public

router.get('/scrapper', async (req, res) => {
  // connect to DB
  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('BSE.25/07/2020-E');

      // Find all documents in the collection
      collection.find({}).toArray(function (err, cas) {
        if (!err) {

          // send output back
          return res.send(cas);

          // log data to the console as well
          //console.log(todos);
        }
      });

    }
  });
});

//@route    GET route/table/filter
//@desc     get profile by id
//@access   Public

router.post('/filter/equity', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Security_Code, Company_Name } = req.body;

  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('equity');

      // Find all documents in the collection
      if (Security_Code && !Company_Name) collection.find({ Security_Code: { $regex: Security_Code, $options: "$i" } }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          res.send(cas);

          // log data to the console as well

        }
      });

      else if (Company_Name && !Security_Code) collection.find({ 'Company_Name': Company_Name }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          return (res.send(cas));

          // log data to the console as well

        }
      });


      else if (Security_Code && Company_Name) collection.find({ Security_Code: { $regex: Security_Code, $options: "$i" }, 'Company_Name': Company_Name }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          res.send(cas);


        }
      });

    }
  });




});


//@route    GET route/table/filter/mutualfunds
//@desc     get profile by id
//@access   Public

router.post('/filter/mutualfunds', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ISIN } = req.body;

  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('mutual_funds');

      // Find all documents in the collection
      if (ISIN) collection.find({ 'ISIN': ISIN }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          res.send(cas);

          // log data to the console as well

        }
      });

    }
  });




});

//@route    GET route/table/filter
//@desc     get profile by id
//@access   Public

router.post('/filter/splits', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Security_Code, Company_Name } = req.body;

  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('split');

      // Find all documents in the collection
      if (Security_Code && !Company_Name) collection.find({ Security_Code: { $regex: Security_Code, $options: "$i" } }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          res.send(cas);

          // log data to the console as well

        }
      });

      else if (Company_Name && !Security_Code) collection.find({ 'Company_Name': Company_Name }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          return (res.send(cas));

          // log data to the console as well

        }
      });


      else if (Security_Code && Company_Name) collection.find({ Security_Code: { $regex: Security_Code, $options: "$i" }, 'Company_Name': Company_Name }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          res.send(cas);


        }
      });

    }
  });

  




});

//@route    GET route/table/filter
//@desc     get profile by id
//@access   Public

router.post('/filter/bcdate', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Security_Code, Company_Name } = req.body;

  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('bc_date');

      // Find all documents in the collection
      if (Security_Code && !Company_Name) collection.find({ Security_Code: { $regex: Security_Code, $options: "$i" } }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          res.send(cas);

          // log data to the console as well

        }
      });

      else if (Company_Name && !Security_Code) collection.find({ 'Company_Name': Company_Name }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          return (res.send(cas));

          // log data to the console as well

        }
      });


      else if (Security_Code && Company_Name) collection.find({ Security_Code: { $regex: Security_Code, $options: "$i" }, 'Company_Name': Company_Name }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          res.send(cas);


        }
      });

    }
  });

});

//@route    GET route/table/filter
//@desc     get profile by id
//@access   Public

router.post('/filter/scrapper', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Security_Code, Company_Name } = req.body;

  MongoClient.connect(dburl, function (err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection('BSE.25/07/2020-E');

      // Find all documents in the collection
      if (Security_Code && !Company_Name) collection.find({ Security_Code: { $regex: Security_Code, $options: "$i" } }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          res.send(cas);

          // log data to the console as well

        }
      });

      else if (Company_Name && !Security_Code) collection.find({ 'Company_Name': Company_Name }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          return (res.send(cas));

          // log data to the console as well

        }
      });


      else if (Security_Code && Company_Name) collection.find({ Security_Code: { $regex: Security_Code, $options: "$i" }, 'Company_Name': Company_Name }).toArray(function (err, cas) {
        if (!err) {

          // send output back
          res.send(cas);


        }
      });

    }
  });

});

module.exports = router;