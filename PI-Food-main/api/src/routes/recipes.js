const { Router } = require("express");
const {
  get_AllRecipes,
  getDataBaseID,
  get_ApiID,
} = require("../controllers/recipe");
const router = Router();

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  try {
    let AllRecipes = await get_AllRecipes();

    if (name) {
      let recipeByName = await AllRecipes.filter((r) =>
        r.name.toLowerCase().includes(name.toString().toLowerCase())
      ); //el LowerCase use para evitar problemas al comparar
      if (recipeByName.length) {
        let recipes = recipeByName.map((r) => {
          return {
            id: r.id,
            name: r.name,
            summary: r.summary,
            healthScore: r.healthScore,
            image: r.image,
            steps: r.steps,
            diets: r.diets ? r.diets : r.diets.map((r) => r.name),
          };
        });
        return res.status(200).send(recipes);
      }
      return res.status(400).send("Recipes not found.");
    } else {
      // En caso de no tener nombre, voy a devolver todas las recetas
      let recipes = AllRecipes.map((r) => {
        return {
          id: r.id,
          name: r.name,
          summary: r.summary,
          healthScore: r.healthScore,
          image: r.image,
          steps: r.steps,
          diets: r.diets ? r.diets : r.diets.map((r) => r.name),
        };
      });
      return res.status(200).send(recipes);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let validate = id.includes("-"); // el guion es para saber que esta en la base de datos.
  try {
    if (validate) {
      let recipeDB = await get_DataBaseID(id);
      return res.statusCode(200).send(recipeDB);
    } else {
      let recipeAPI = await get_ApiID(id);
      return res.status(200).send(recipeAPI);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
