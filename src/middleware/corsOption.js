const corsOption = (req, res, next) => {
  console.log(res);
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Request headers you wish to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, Authorization"
  );
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With,content-type"
  // );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
};

module.exports = corsOption;
