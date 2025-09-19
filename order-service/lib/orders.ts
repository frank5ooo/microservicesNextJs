interface Order {
    id: number,
    description: string,
    price: number,
}

export const orders: Order[] = [
    {
        id: 1,
        description: "Compré un pollo",
        price: 800000,
    }
]