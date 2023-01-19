import { Request, Response } from 'express';
import logger from '../utils/logger';
import {
  createProductInput,
  updateProductInput,
  deleteProductInput,
  getProductInput
} from '../schemas/product.schema';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  findProduct
} from '../services/product.service';


export async function findProductHandler(req: Request<getProductInput['params']>, res: Response) {
  try {
    const product = await findProduct({ _id: req.params.productId })
    if (!product) {
      throw {
        statusCode: 404,
        message: 'Product not found'
      }
    }
    return res.send(product)
  } catch (error: any) {
    logger.error(error);
    return res.status(error.statusCode || 500).json({ err_message: error.message })
  }
}

export async function createProductHandler(req: Request<{}, {}, createProductInput['body']>, res: Response) {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const product = await createProduct({ ...body, userId })
    return res.send(product)
  } catch (error: any) {
    logger.error(error);
    return res.status(error.statusCode || 500).json({ err_message: error.message })
  }
}

export async function updateProductHandler(req: Request<updateProductInput['params']>, res: Response) {
  try {
    const userId = res.locals.user._id;
    const update = req.body;
    const productId = req.params.productId;

    const product = await findProduct({ _id: productId })
    if (!product) {
      throw {
        statusCode: 404,
        message: 'Product not found'
      }
    }

    if (String(product.userId) !== userId) {
      throw {
        statusCode: 401,
        message: 'Unauthorized'
      }
    }

    const updatedProduct = await updateProduct({ _id: productId }, update, { new: true })
    return res.send(updatedProduct)
  } catch (error: any) {
    logger.error(error);
    return res.status(error.statusCode || 500).json({ err_message: error.message })
  }
}

export async function deleteProductHandler(req: Request<deleteProductInput['params']>, res: Response) {
  try {
    const userId = res.locals.user._id;
    const update = req.body;
    const productId = req.params.productId;

    const product = await findProduct({ _id: productId })
    if (!product) {
      throw {
        statusCode: 404,
        message: 'Product not found'
      }
    }

    if (String(product.userId) !== userId) {
      throw {
        statusCode: 401,
        message: 'Unauthorized'
      }
    }

    await deleteProduct({ _id: productId })
    return res.json({ message: 'Successfully deleted.' })
  } catch (error: any) {
    logger.error(error);
    return res.status(error.statusCode || 500).json({ err_message: error.message })
  }
}