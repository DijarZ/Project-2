const router = require("express").Router();

const { updateStatus, tasksByStatus } = require("../controllers/status");

router.put("/updateStatus/:id", updateStatus);
router.get("/taskStatus/:status", tasksByStatus);
module.exports = router;
