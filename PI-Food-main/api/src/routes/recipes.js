const { Router } = require("express");
const {
  get_AllRecipes,
  getDataBaseID,
  get_ApiID,
} = require("../controllers/recipe");
const router = Router();

// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
