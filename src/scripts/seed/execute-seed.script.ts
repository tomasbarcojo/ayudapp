// import { NestFactory } from '@nestjs/core';
// import { UserService } from '../../modules/user/user.service';
// import { AppModule } from '../../app.module';
// import { faker } from '@faker-js/faker';
// import { UserModule } from '../../modules/user/user.module';
// import { CategoryModule } from '../../modules/category/category.module';
// import { CategoryService } from '../../modules/category/category.service';
// import { ProductModule } from '../../modules/product/product.module';
// import { ProductService } from '../../modules/product/product.service';
// import { PricelistModule } from '../../modules/pricelist/pricelist.module';
// import { PricelistService } from '../../modules/pricelist/pricelist.service';
// import { SupplierModule } from 'src/modules/supplier/supplier.module';
// import { SupplierService } from 'src/modules/supplier/supplier.service';
// import * as argon from 'argon2';
// import { ClientModule } from 'src/modules/client/client.module';
// import { ClientService } from 'src/modules/client/client.service';
// import dataSource from 'src/ormconfig';

// const boostrap = async () => {
//   const app = await NestFactory.createApplicationContext(AppModule);
//   const userService = app.select(UserModule).get(UserService, { strict: true });
//   const productService = app.select(ProductModule).get(ProductService, { strict: true });
//   const categoryService = app.select(CategoryModule).get(CategoryService, { strict: true });
//   const pricelistService = app.select(PricelistModule).get(PricelistService, { strict: true });
//   const clientService = app.select(ClientModule).get(ClientService, { strict: true });
//   const supplerService = app.select(SupplierModule).get(SupplierService, { strict: true });

//   await dataSource.initialize();
//   const entities = dataSource.entityMetadatas;
//   // const connection = await getManager();
//   await dataSource.query('SET foreign_key_checks = 0');
//   for (const entity of entities) {
//     const repository = await dataSource.getRepository(entity.name);
//     await repository.query(`TRUNCATE TABLE ${entity.tableName}`);
//   }
//   await dataSource.query('SET foreign_key_checks = 1');

//   await userService.create({
//     firstName: 'Admin',
//     lastName: 'Admin',
//     email: faker.internet.email(),
//     username: 'admin',
//     password: await argon.hash('1234'),
//     hashedRt: await argon.hash('1234'),
//   });
//   await supplerService.create({
//     businessName: 'Activa SRL',
//     cuit: '30707651926',
//     phone: '3424663535',
//     address: '25 de Mayo 2387',
//     city: 'Santa Fe',
//     CP: '3000',
//     bankaccount1: '519925-12',
//   });
//   for (let i = 0; i < 100; i++) {
//     await supplerService.create({
//       businessName: faker.company.name(),
//       cuit: `${i}`,
//       phone: faker.phone.number('##########'),
//       address: '25 de Mayo 2387',
//       city: faker.address.streetAddress(),
//       CP: faker.address.zipCode(),
//       bankaccount1: faker.finance.account(),
//     });
//   }
//   for (let i = 0; i < 10; i++) {
//     await categoryService.create({
//       categoryName: `Categoria ${i}`,
//       image: faker.image.business(640, 480, true),
//     });
//   }
//   for (let i = 0; i < 300; i++) {
//     await productService.create({
//       name: faker.commerce.productName(),
//       code: String(faker.commerce.product()),
//       price: Number(faker.commerce.price()),
//       stock: faker.datatype.number({ min: 0, max: 1000 }),
//       stockAlert: faker.datatype.number({ min: 10, max: 30 }),
//       image: faker.image.business(640, 480, true),
//       categoryId: Math.floor(Math.random() * 10) + 1,
//       supplierId: Math.floor(Math.random() * 100) + 1,
//       obs: faker.commerce.productDescription(),
//     });
//   }
//   // for (let i = 0; i < 600; i++) {
//   //   await clientService.create({
//   //     businessName: faker.internet.userName(),
//   //     cuit: `${i}`,
//   //     address: faker.address.streetName(),
//   //     city: faker.address.cityName(),
//   //     CP: faker.address.zipCode(),
//   //     phone: faker.phone.phoneNumber(),
//   //     altPhone: faker.phone.phoneNumber(),
//   //   });
//   // }

//   await app.close();
// };

// boostrap();
