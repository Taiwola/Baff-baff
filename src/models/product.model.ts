import mongoose, { Schema, Document, Model } from 'mongoose'

export const products: Product[] = [
  // {
  //   id: '1',
  //   slug: 'classic-white-shirt',
  //   name: 'Classic White Shirt',
  //   images: [
  //     'https://picsum.photos/id/1011/800/800',
  //     'https://picsum.photos/id/1012/800/800',
  //     'https://picsum.photos/id/1013/800/800',
  //     'https://picsum.photos/id/1014/800/800'
  //   ],
  //   price: 45000,
  //   discountPrice: 30000,
  //   stockCount: 5,
  //   createdAt: '2025-03-01'
  // },
  // {
  //   id: '2',
  //   slug: 'blue-denim-jacket',
  //   name: 'Blue Denim Jacket',
  //   images: [
  //     'https://picsum.photos/id/1015/800/800',
  //     'https://picsum.photos/id/1016/800/800',
  //     'https://picsum.photos/id/1017/800/800',
  //     'https://picsum.photos/id/1018/800/800'
  //   ],
  //   price: 90000,
  //   stockCount: 3,
  //   createdAt: '2025-02-20'
  // },
  // {
  //   id: '3',
  //   slug: 'black-formal-trousers',
  //   name: 'Black Formal Trousers',
  //   images: [
  //     'https://picsum.photos/id/1019/800/800',
  //     'https://picsum.photos/id/1020/800/800',
  //     'https://picsum.photos/id/1021/800/800',
  //     'https://picsum.photos/id/1022/800/800'
  //   ],
  //   price: 60000,
  //   stockCount: 10,
  //   createdAt: '2025-03-05'
  // },
  // {
  //   id: '4',
  //   slug: 'red-casual-tshirt',
  //   name: 'Red Casual T-shirt',
  //   images: [
  //     'https://picsum.photos/id/1023/800/800',
  //     'https://picsum.photos/id/1024/800/800',
  //     'https://picsum.photos/id/1025/800/800',
  //     'https://picsum.photos/id/1026/800/800'
  //   ],
  //   price: 25000,
  //   stockCount: 15,
  //   createdAt: '2025-03-10'
  // },
  // {
  //   id: '5',
  //   slug: 'grey-sweatshirt',
  //   name: 'Grey Sweatshirt',
  //   images: [
  //     'https://picsum.photos/id/1027/800/800',
  //     'https://picsum.photos/id/1028/800/800',
  //     'https://picsum.photos/id/1029/800/800',
  //     'https://picsum.photos/id/1030/800/800'
  //   ],
  //   price: 40000,
  //   stockCount: 8,
  //   createdAt: '2025-03-12'
  // },
  // {
  //   id: '6',
  //   slug: 'striped-casual-shirt',
  //   name: 'Striped Casual Shirt',
  //   images: [
  //     'https://picsum.photos/id/1031/800/800',
  //     'https://picsum.photos/id/1032/800/800',
  //     'https://picsum.photos/id/1033/800/800',
  //     'https://picsum.photos/id/1034/800/800'
  //   ],
  //   price: 50000,
  //   stockCount: 12,
  //   createdAt: '2025-03-15'
  // },
  // {
  //   id: '7',
  //   slug: 'navy-blue-blazer',
  //   name: 'Navy Blue Blazer',
  //   images: [
  //     'https://picsum.photos/id/1035/800/800',
  //     'https://picsum.photos/id/1036/800/800',
  //     'https://picsum.photos/id/1037/800/800',
  //     'https://picsum.photos/id/1038/800/800'
  //   ],
  //   price: 120000,
  //   stockCount: 4,
  //   createdAt: '2025-03-18'
  // },
  // {
  //   id: '8',
  //   slug: 'black-leather-shoes',
  //   name: 'Black Leather Shoes',
  //   images: [
  //     'https://picsum.photos/id/1039/800/800',
  //     'https://picsum.photos/id/1040/800/800',
  //     'https://picsum.photos/id/1041/800/800',
  //     'https://picsum.photos/id/1042/800/800'
  //   ],
  //   price: 80000,
  //   stockCount: 6,
  //   createdAt: '2025-03-19'
  // },
  // {
  //   id: '9',
  //   slug: 'green-polo-shirt',
  //   name: 'Green Polo Shirt',
  //   images: [
  //     'https://picsum.photos/id/1043/800/800',
  //     'https://picsum.photos/id/1044/800/800',
  //     'https://picsum.photos/id/1045/800/800',
  //     'https://picsum.photos/id/1046/800/800'
  //   ],
  //   price: 30000,
  //   stockCount: 10,
  //   createdAt: '2025-03-20'
  // },
  // {
  //   id: '10',
  //   slug: 'brown-casual-shoes',
  //   name: 'Brown Casual Shoes',
  //   images: [
  //     'https://picsum.photos/id/1047/800/800',
  //     'https://picsum.photos/id/1048/800/800',
  //     'https://picsum.photos/id/1049/800/800',
  //     'https://picsum.photos/id/1050/800/800'
  //   ],
  //   price: 60000,
  //   stockCount: 7,
  //   createdAt: '2025-03-21'
  // },
  // {
  //   id: '11',
  //   slug: 'white-cotton-shirt',
  //   name: 'White Cotton Shirt',
  //   images: [
  //     'https://picsum.photos/id/1051/800/800',
  //     'https://picsum.photos/id/1052/800/800',
  //     'https://picsum.photos/id/1053/800/800',
  //     'https://picsum.photos/id/1054/800/800'
  //   ],
  //   price: 45000,
  //   stockCount: 9,
  //   createdAt: '2025-03-22'
  // },
  // {
  //   id: '12',
  //   slug: 'black-jeans',
  //   name: 'Black Jeans',
  //   images: [
  //     'https://picsum.photos/id/1055/800/800',
  //     'https://picsum.photos/id/1056/800/800',
  //     'https://picsum.photos/id/1057/800/800',
  //     'https://picsum.photos/id/1058/800/800'
  //   ],
  //   price: 55000,
  //   stockCount: 14,
  //   createdAt: '2025-03-23'
  // },
  // {
  //   id: '13',
  //   slug: 'yellow-tshirt',
  //   name: 'Yellow T-shirt',
  //   images: [
  //     'https://picsum.photos/id/1059/800/800',
  //     'https://picsum.photos/id/1060/800/800',
  //     'https://picsum.photos/id/1061/800/800',
  //     'https://picsum.photos/id/1062/800/800'
  //   ],
  //   price: 25000,
  //   stockCount: 20,
  //   createdAt: '2025-03-24'
  // },
  // {
  //   id: '14',
  //   slug: 'denim-trousers',
  //   name: 'Denim Trousers',
  //   images: [
  //     'https://picsum.photos/id/1063/800/800',
  //     'https://picsum.photos/id/1064/800/800',
  //     'https://picsum.photos/id/1065/800/800',
  //     'https://picsum.photos/id/1066/800/800'
  //   ],
  //   price: 60000,
  //   stockCount: 12,
  //   createdAt: '2025-03-25'
  // },
  // {
  //   id: '15',
  //   slug: 'orange-hoodie',
  //   name: 'Orange Hoodie',
  //   images: [
  //     'https://picsum.photos/id/1067/800/800',
  //     'https://picsum.photos/id/1068/800/800',
  //     'https://picsum.photos/id/1069/800/800',
  //     'https://picsum.photos/id/1070/800/800'
  //   ],
  //   price: 40000,
  //   stockCount: 11,
  //   createdAt: '2025-03-26'
  // },
  // {
  //   id: '16',
  //   slug: 'navy-tshirt',
  //   name: 'Navy T-shirt',
  //   images: [
  //     'https://picsum.photos/id/1071/800/800',
  //     'https://picsum.photos/id/1072/800/800',
  //     'https://picsum.photos/id/1073/800/800',
  //     'https://picsum.photos/id/1074/800/800'
  //   ],
  //   price: 30000,
  //   stockCount: 18,
  //   createdAt: '2025-03-27'
  // },
  // {
  //   id: '17',
  //   slug: 'brown-belt',
  //   name: 'Brown Leather Belt',
  //   images: [
  //     'https://picsum.photos/id/1075/800/800',
  //     'https://picsum.photos/id/1076/800/800',
  //     'https://picsum.photos/id/1077/800/800',
  //     'https://picsum.photos/id/1078/800/800'
  //   ],
  //   price: 15000,
  //   stockCount: 25,
  //   createdAt: '2025-03-28'
  // },
  // {
  //   id: '18',
  //   slug: 'grey-blazer',
  //   name: 'Grey Blazer',
  //   images: [
  //     'https://picsum.photos/id/1079/800/800',
  //     'https://picsum.photos/id/1080/800/800',
  //     'https://picsum.photos/id/1081/800/800',
  //     'https://picsum.photos/id/1082/800/800'
  //   ],
  //   price: 110000,
  //   stockCount: 5,
  //   createdAt: '2025-03-29'
  // },
  // {
  //   id: '19',
  //   slug: 'black-tshirt',
  //   name: 'Black T-shirt',
  //   images: [
  //     'https://picsum.photos/id/1083/800/800',
  //     'https://picsum.photos/id/1084/800/800',
  //     'https://picsum.photos/id/1085/800/800',
  //     'https://picsum.photos/id/1086/800/800'
  //   ],
  //   price: 25000,
  //   stockCount: 16,
  //   createdAt: '2025-03-30'
  // },
  // {
  //   id: '20',
  //   slug: 'white-sneakers',
  //   name: 'White Sneakers',
  //   images: [
  //     'https://picsum.photos/id/1087/800/800',
  //     'https://picsum.photos/id/1088/800/800',
  //     'https://picsum.photos/id/1089/800/800',
  //     'https://picsum.photos/id/1090/800/800'
  //   ],
  //   price: 70000,
  //   stockCount: 8,
  //   createdAt: '2025-03-31'
  // }
]


export enum Size {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl',
  XXXL = 'xxxl'
}

export enum Status {
  IN_STOCK = 'inStock',
  OUT_OF_STOCK = 'outOfStock'
}

export interface ISizeDetails {
  price: number
  quantity: number
}

export interface IProduct extends Document {
  _id: string
  images: string[]
  description: string
  category: string
  category_type: string
  material: mongoose.Types.ObjectId | string
  yard: number
  name: string
  status: Status
  s: ISizeDetails
  m: ISizeDetails
  l: ISizeDetails
  xl: ISizeDetails
  xxl: ISizeDetails
  xxxl: ISizeDetails
  createdAt: Date
  updatedAt: Date
}

const sizeDetailsSchema: Schema = new Schema<ISizeDetails>({
  price: { type: Number, required: true, default: 0 },
  quantity: { type: Number, required: true, default: 0 }
})

const productSchema: Schema = new Schema<IProduct>(
  {
    images: { type: [String], required: true },
    category: { type: String, required: true },
    category_type: { type: String, required: true },
    description: { type: String, required: true },
    material: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
    yard: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true, enum: Object.values(Status), default: Status.IN_STOCK },
    s: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } },
    m: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } },
    l: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } },
    xl: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } },
    xxl: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } },
    xxxl: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } }
  },
  {
    timestamps: true
  }
)

const ProductModel: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema)

export default ProductModel
