const router = require("express").Router();
const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");

router.get("/create", (req, res) => {
  res.render("cube/create");
});

router.post("/addCube", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeManager.createCube({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect("/");
});

router.get("/details/:cubeId", async (req, res) => {
  const id = req.params.cubeId;
  const cubeDetails = await cubeManager.getSingleCube(id);

  if (!cubeDetails) {
    res.redirect("/404");
  }

  res.render("cube/details", { cubeDetails });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
  const cubeId = req.params.cubeId;
  const cubeDetails = await cubeManager.getSingleCube(cubeId);
  const accessories = await accessoryManager.getAccessories();
  res.render('accessory/attach', { cubeDetails, accessories });
});

module.exports = router;
