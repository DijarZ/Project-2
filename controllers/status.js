const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { TaskStatus } = require("@prisma/client");

const updateStatus = async (req, res) => {
  try {
    const { newStatus } = req.body;
    const statusId = parseInt(req.params.id);

    if (!Object.values(TaskStatus).includes(newStatus)) {
      return res
        .status(400)
        .send(
          `Invalid value! Allowed values are: ${Object.values(TaskStatus).join(
            ","
          )}`
        );
    }

    const updatedTask = await prisma.taskstatus.update({
      where: {
        status_id: statusId,
      },
      data: {
        status_name: newStatus,
      },
    });

    console.log("Updated Task:", updatedTask);
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!");
  }
};

const tasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const taskstatus = await prisma.tasks.findMany({
      where: {
        taskstatus: {
          some: {
            status_name: status,
          },
        },
      },
    });

    console.log("Tasks by status:", taskstatus);
    res.json(taskstatus);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  updateStatus,
  tasksByStatus,
};
