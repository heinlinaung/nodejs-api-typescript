import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import ProductModel, { IProduct } from "../models/product.model";

export async function findProduct(query: FilterQuery<IProduct>, options: QueryOptions = { lean: true }) {
  return ProductModel.findOne(query, {}, options)
}

export async function createProduct(input: DocumentDefinition<Omit<IProduct, 'createdAt' | 'updatedAt'>>) {
  return await ProductModel.create(input)
}

export async function updateProduct(query: FilterQuery<IProduct>
  , update: DocumentDefinition<Omit<IProduct, 'createdAt' | 'updatedAt'>>
  , options: QueryOptions) {
  return await ProductModel.findOneAndUpdate(query, update, options)
}

export async function deleteProduct(query: FilterQuery<IProduct>) {
  return await ProductModel.deleteOne(query)
}