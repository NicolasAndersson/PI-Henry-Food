const { Router } = require("express");

const recipesRouter = require("./recipes");
const typesRouter = require("./types");
const recipeRouter = require("./recipe");

const router = Router();

router.use("/recipes", recipesRouter);
router.use("/types", typesRouter);
router.use("/recipe", recipeRouter);

module.exports = router;
