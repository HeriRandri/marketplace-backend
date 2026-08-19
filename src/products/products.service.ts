import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly products: Product [] = [
    {
      id:1,
      name: 'ordinateur Portable',
      description: 'Ordinateur destiné au développement',
      price: 2500000,
      stock: 5,
    },
     {
      id: 2,
      name: 'Téléphone',
      description: 'Téléphone Android',
      price: 800000,
      stock: 10,
  },
  ];
 

  create(createProductDto:CreateProductDto){
    const newProduct: Product = {
      id:Date.now(),
      name:createProductDto.name,
      description:createProductDto.description,
      price:createProductDto.price,
      stock:createProductDto.stock,
    }
    this.products.push(newProduct);
    return newProduct
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product{
    const product = this.products.find((products) => products.id === id);
    if (!product) {
      throw new  NotFoundException(`Produit avec l'id ${id} introuvable`)
    }
    return product; 
  }
 

 update(id: number, updateProductDto: UpdateProductDto): Product {
  const product = this.findOne(id);

  Object.assign(product, updateProductDto);

  return product;
}

  remove(id: number) {
  const product = this.findOne(id);
  const index = this.products.findIndex((item) => item.id ===id )
  this.products.splice(index, 1)
  return product
  }
}
