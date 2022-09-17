import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";
import { ensureAuthetication } from "middlewares/ensureAuthentication";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategory/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./temp",
});

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  "/",
  ensureAuthetication,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthetication,
  ensureAdmin,
  importCategoriesController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

export { categoriesRoutes };
