export async function getProduct(ctx: Context) {
    const {
        clients: { Products },
        vtex: {
            route: { params },
        },
    } = ctx
    const { productId } = params
    console.log(productId)
    ctx.body = await Products.getProduct(productId as string)
    ctx.set('cache-control', 'no-cache')
}

export function createProduct(){}