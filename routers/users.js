const router = require("express").Router();

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.post("/createUser", createUser);
router.get("/getUsers", getUsers);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
module.exports = router;
