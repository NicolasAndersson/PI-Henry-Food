import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import LandingPage from "./components/landingPage/LandingPage";
import AddRecipe from "./components/addRecipe/AddRecipe";
import RecipeDetails from "./components/recipeDetail/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/recipe" exact component={AddRecipe} />
          <Route path="/home/:id" component={RecipeDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
