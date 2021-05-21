const express = require("express");
const router = express.Router();

const { getUserById, getUser ,userLikes,getAll,addLikes} = require("../controllers/user");
const { isSignedIn, isAuthenticated} = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

 router.put("/user/:userId/addlikes", isSignedIn, isAuthenticated,addLikes);

router.get("/user/:userId/getlikes", isSignedIn, isAuthenticated,userLikes);

router.get("/users",getAll)
module.exports = router;
