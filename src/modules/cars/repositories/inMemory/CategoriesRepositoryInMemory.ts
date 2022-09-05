/* eslint-disable @typescript-eslint/no-unused-vars */
import { Category } from "@modules/cars/entities/Category";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, { name, description });
    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    const listCategories = await this.categories;
    return listCategories;
  }
  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.categories.find(
      (category) => category.name === name
    );
    return category;
  }
}

export { CategoriesRepositoryInMemory };
