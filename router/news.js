const router = require("express").Router();
const news = require("../controller/news");


router.get("/fetchnews", news.fetchnews);

//router.get("/fetchvideonews", news.fetchvideonews);

module.exports = router;
