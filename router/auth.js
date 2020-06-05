const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const auth = require("../controller/auth");

//localhost:5000/api/auth/
//router.post('/')

router.post("/register", auth.postRegister);
router.get("/userData", authMiddleware.checkAuth, auth.fetchUserData);
router.post("/login",  auth.postLogin);
router.post("/token", auth.tokenLogin);
router.post("/updateUserData", auth.updateUserData);
router.post("/support", auth.sendEmail);



module.exports = router;
