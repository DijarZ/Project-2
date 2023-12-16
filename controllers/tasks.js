const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTasks = async (req, res) => {
  try {
    let status_name = "to_do";
    const { description, name } = req.body;
    const tasks = await prisma.tasks.create({
      data: {
        description,
        name,
        taskstatus: {
          create: {
            status_name,
          },
        },
      },
    });
    console.log("Created Task:", tasks);
    res.json(tasks);
  } catch (error) {
    console.error("Error creating user:", error);

    res.status(500).send("Internal Server Error!");
  }
};

const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedTask = await prisma.tasks.update({
      where: { id: parseInt(id) },
      data: {
        description,
        name,
      },
    });

    console.log("Updated", updatedTask);
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Internal Server Error!");
  }
};

const deletedTasks = async (req, res) => {
  try {
    const taskidDelete = parseInt(req.params.id);
    const deletedTasks = await prisma.tasks.findUnique({
      where: {
        id: taskidDelete,
      },
    });

    if (!deletedTasks) {
      return res.status(404).json("Task not found");
    }

    // Fshirja e te dhenave qe eshte i lidhur me taskun me foreignkey
    await prisma.taskstatus.deleteMany({
      where: {
        task_id: taskidDelete,
      },
    });
    //Fshirja e taskut
    await prisma.tasks.delete({
      where: { id: taskidDelete },
    });

    res.json("Task deleted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error!");
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.tasks.findMany({});
    res.json(tasks);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
};

const assignTaskToUser = async (req, res) => {
  try {
    const { userId, name, email, taskName } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        name,
        email,
      },
    });

    const task = await prisma.tasks.findFirst({
      where: { name: taskName },
    });
    const assignedTask = await prisma.tasks.update({
      where: { id: task.id },
      data: {
        userId: user.id,
      },
    });

    console.log("Assigned Task:", assignedTask);
    res.json(assignedTask);
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).send("Internal Server Error!");
  }
};

const viewTasks = async (req, res) => {
  const { name, email } = req.params;

  try {
    const userTasks = await prisma.users.findUnique({
      where: { name, email },
      include: { Tasks: true },
    });

    if (!userTasks) {
      return res.status(404).send("User not found");
    }
    if (!userTasks.Tasks.length) {
      return res.status(404).send("User doesn't have any task!");
    }

    console.log(userTasks.Tasks);
    res.json(userTasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  createTasks,
  updateTasks,
  deletedTasks,
  getTasks,
  assignTaskToUser,
  viewTasks,
};
