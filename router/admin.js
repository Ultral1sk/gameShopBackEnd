
const router = require("express").Router();
const admin = require("../controller/admin");
const auth = require("../middleware/auth");

router.get("/", auth.checkAuth, admin.admin);
router.post("/addgame", admin.addGameForm);
router.post("/editgame", admin.editGameForm);
router.post("/deletegame", admin.deleteGameForm);


module.exports = router;