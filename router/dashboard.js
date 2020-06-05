const router = require("express").Router();
const dashboard = require("../controller/dashboard");
const auth = require("../middleware/auth");

router.get("/",  dashboard.home);
router.post("/", dashboard.newsLetter);




module.exports = router;
