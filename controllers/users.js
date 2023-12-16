const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const allusers = await prisma.users.findMany();
    res.json(allusers);
    console.log(allusers);
  } catch (error) {
    console.error(error);

    res.status(500).send("Internal Server Error!");
  }
};

const createUser = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const users = await prisma.users.create({
      data: {
        name,
        email,
        role,
      },
    });
    console.log("Created User:", users);

    res.json(users);
  } catch (error) {
    console.error("Error creating user:", error);

    res.status(500).send("Internal Server Error!");
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const updatesusers = await prisma.users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        role,
        email,
      },
    });

    res.json(updatesusers);
    console.log(updatesusers);
  } catch (error) {
    console.error("Error updating user:", error);

    res.status(500).send("Internal Server Error!");
  }
};

const deleteUser = async (req, res) => {
  try {
    const useridDelete = parseInt(req.params.id);

    const deletedUser = await prisma.users.delete({
      where: { id: useridDelete },
    });

    if (deletedUser) {
      res.json("User deleted successfully!");
    } else {
      res.status(404).json("User not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error!");
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
