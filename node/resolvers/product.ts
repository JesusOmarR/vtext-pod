export const product = async (
    _: any,
    { productId }: { productId: string },
    { clients: { Products} }: Context
) => await Products.getProduct(productId)