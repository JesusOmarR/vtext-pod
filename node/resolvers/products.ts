export const Allproducts = async (
    _: any,
    { clients: { Products } }: Context
) => await Products.getAllProducts()