export async function GET(request) {
  const products = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
  ];

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  const newProduct = await request.json();

  newProduct.id = Math.floor(Math.random() * 1000); // Random ID for demo

  return new Response(JSON.stringify(newProduct), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
