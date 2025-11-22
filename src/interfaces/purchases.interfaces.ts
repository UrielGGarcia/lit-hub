export interface Purchases {
    id: number,
    purchaseDate: string,
    priceAtPurchase: number,
    userId: number,
    bookId: number,
    status: string,
    stripeSessionId: string,
    stripePaymentIntentId: string;
}
