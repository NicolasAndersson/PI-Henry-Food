const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const { types } = require("../controllers/diet");
const router = Router();

router.post("/", async (req, res, next) => {
  const { name, summary, healthScore, image, steps, diets } = req.body;
  try {
    const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      image,
      steps,
    });

    let dietDB = await Diet.findAll({
      where: {
        name: diets,
      },
    });
    newRecipe.addDiet(dietDB);

    var aux = diets.pop();
    var validate = types.includes(aux);
    if (!validate) {
      var noRepeat = Diet.findAll({
        where: {
          name: aux,
        },
      });
      if (!noRepeat.length) {
        const newDiet = await Diet.create({ name: aux });
        newRecipe.addDiet(newDiet);
        types.push(aux);
      }
    }
    res.statusCode(200).send(newRecipe);
  } catch (error) {
    next(err);
  }
});