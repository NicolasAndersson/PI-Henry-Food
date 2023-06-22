const { Router } = require("express");

const router = Router();
const recipe = require("./recipe.js");
const recipes = require("./recipes.js");
const diet = require("./diet");

router.use("/recipe", recipe);
router.use("/recipes", recipes);
router.use("/diet", diet);

module.exports = router;
