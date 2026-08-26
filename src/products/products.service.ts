import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

  
  // private readonly products: Product [] = [
  //   {
  //     id:1,
  //     name: 'ordinateur Portable',
  //     description: 'Ordinateur destiné au développement',
  //     price: 2500000,
  //     stock: 5,
  //   },
  //    {
  //     id: 2,
  //     name: 'Téléphone',
  //     description: 'Téléphone Android',
  //     price: 800000,
  //     stock: 10,
  // },
  // ];

  constructor (private readonly prisma:PrismaService){}

    private async ensureCategoryExists(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with id ${categoryId} not found`,
      );
    }
  }

  // create(), findAll(), findOne(), update(), remove()


  async create(createProductDto:CreateProductDto){

      if (createProductDto.categoryId !== undefined) {
    await this.ensureCategoryExists(
      createProductDto.categoryId,
    );
  }
    return this.prisma.product.create({
      data:createProductDto,
      include: {
        category:true
      }
    })
       // const newProduct: Product = {
    //   id:Date.now(),
    //   name:createProductDto.name,
    //   description:createProductDto.description,
    //   price:createProductDto.price,
    //   stock:createProductDto.stock,
    // }
    // this.products.push(newProduct);
    // return newProduct
  }

  findAll(){
    return this.prisma.product.findMany({
      orderBy: {
        createdAt:'desc'
      }, 
      include:{
        category : true
      }
    })
    // return this.products;
  }

  async findOne(id: number){
    const product  = await this.prisma.product.findUnique({
      where :{id},
      include : {
        category : true
      }
    });

      if (!product) {
        throw new NotFoundException (`Product with id ${id} not found`);
      }
      return product;
  }
 

 async update(id: number, updateProductDto: UpdateProductDto) {
   await this.findOne(id);
  if (updateProductDto.categoryId !== undefined) {
    await this.ensureCategoryExists(
      updateProductDto.categoryId,
    );
  }

  const product  =  this.prisma.product.update({
  where: { id },
  data: updateProductDto,
  include: {
    category: true,
  },
});

    if (!product) {
        throw new NotFoundException (`Product with id ${id} not found`);
      }
    return product
}

  async remove(id: number) {
  await this.findOne(id);

    const product = await this.prisma.product.delete({
      where : {id}
    })

    if (!product) {
        throw new NotFoundException (`Product with id ${id} not found`);
      }
      
  // const index = this.products.findIndex((item) => item.id ===id )
  // this.products.splice(index, 1)
  // return product
  }
}

