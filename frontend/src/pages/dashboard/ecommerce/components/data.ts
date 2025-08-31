type StatisticsWidgetProps = {
  variant: string;
  cardTitle: string;
  change: string;
  stats: string;
  chartSeries: number[];
  colors: string[];
};

type Product = {
  product: string;
  price: number;
  orders: number;
  quantity: string;
  seller: string;
};
const statisticsData: StatisticsWidgetProps[] = [
  {
    cardTitle: "Customers",
    change: "2,541",
    chartSeries: [58, 42],
    colors: ["#47ad77", "#e3e9ee"],
    stats: "54,214",
    variant: "primary",
  },
  {
    cardTitle: "Orders",
    change: "1.08%",
    chartSeries: [34, 66],
    colors: ["#02BE6A", "#e3e9ee"],
    stats: "7,543",
    variant: "error",
  },
  {
    cardTitle: "Revenue",
    change: "7.00%",
    chartSeries: [87, 13],
    colors: ["#16a7e9", "#e3e9ee"],
    stats: "$9,254",
    variant: "error",
  },
  {
    cardTitle: "Growth",
    change: "4.87%",
    chartSeries: [87, 13],
    colors: ["#ffc35a", "#e3e9ee"],
    stats: "+ 20.6%",
    variant: "success",
  },
  {
    cardTitle: "Conversation",
    change: "3.48%",
    chartSeries: [23, 68],
    colors: ["#f15776", "#e3e9ee"],
    stats: "+ 9.62%",
    variant: "success",
  },
];

const products: Product[] = [
  {
    product: "ASOS Ridley High Waist",
    price: 79.49,
    orders: 82,
    quantity: "8,540",
    seller: "Adidas",
  },
  {
    product: "Marco Lightweight Shirt",
    price: 12.5,
    orders: 58,
    quantity: "6,320",
    seller: "Puma",
  },
  {
    product: "Half Sleeve Shirt",
    price: 9.99,
    orders: 254,
    quantity: "10,258",
    seller: "Nike",
  },
  {
    product: "Lightweight Jacket",
    price: 69.99,
    orders: 560,
    quantity: "1,020",
    seller: "Puma",
  },
  {
    product: "Marco Sport Shoes",
    price: 119.99,
    orders: 75,
    quantity: "357",
    seller: "Adidas",
  },
  {
    product: "Custom Women's T-shirts",
    price: 45.0,
    orders: 85,
    quantity: "135",
    seller: "Branded",
  },
];
export { statisticsData, products };
