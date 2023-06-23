const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY, URL_SPOONACULAR } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `${URL_SPOONACULAR}/recipes/${id}/information?apiKey=${API_KEY}`
  );

  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      image: e.image,
      name: e.title,
      dietTypes: e.diets,
      summary: e.summary,
      score: e.spoonacularScore,
      healthScore: e.healthScore,
      dishTypes: e.dishTypes,
      steps: e.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
    };
  });

  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getApiById = async (id) => {
  return await axios.get(
    `${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
};

const getDbById = async (id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);

  return totalInfo;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllRecipes,
  getDbById,
  getApiById,
};
