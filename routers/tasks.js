const router = require("express").Router();

const {
  createTasks,
  updateTasks,
  deletedTasks,
  getTasks,
  assignTaskToUser,

  viewTasks,
} = require("../controllers/tasks");

router.post("/createTask", createTasks);
router.put("/updateTask/:id", updateTasks);
router.delete("/deleteTask/:id", deletedTasks);
router.get("/getTasks", getTasks);
router.post("/assignTask", assignTaskToUser);
router.get("/viewTasks/:name/:email", viewTasks);
module.exports = router;
