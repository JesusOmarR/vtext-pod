import type { InstanceOptions, IOContext } from "@vtex/api"
import { JanusClient } from "@vtex/api"

export default class MyClient extends JanusClient {

    private get routes() {
        const base = 'https://walmartcrqa.vtexcommercestable.com.br'

        return {
            getAllProductsRoute: (productId: string) =>
                `${base}/api/catalog/pvt/product/${productId}`,
            getProductContext: (productId: string) =>
                `${base}/api/catalog_system/pvt/products/productget/${productId}`,
            getProductSpecification: (productId: string) =>
                `${base}/api/catalog_system/pvt/products/${productId}/specification`,
            getProductReviewRate: (productId: string) =>
                `${base}/api/addon/pvt/review/GetProductRate/${productId}`,
            getMatchedOffers: (productId: string) =>
                `${base}/api/offer-manager/pvt/product/${productId}`,
            getAllProducstInfo: () =>
                `${base}/api/catalog_system/pub/products/search/`,
            getSimilarProducts: (productId: string) =>
                `${base}/api/catalog_system/pub/products/crossselling/similars/${productId}`

        }
    }


    constructor(context: IOContext, options?: InstanceOptions) {
        super(context, {
            ...options,
            headers: {
                Accept: 'application/json',
                VtexIdclientAutCookie: context.authToken ?? "",
                'x-vtex-user-agent': context.userAgent,
                ...options?.headers,
                "X-VTEX-API-AppKey": "vtexappkey-walmartcrqa-CPVNMP",
                "X-VTEX-API-AppToken": "TDTHYKRFMYXNXBHWPACLAPHYIGBZCFLMKPKRYCSSCLSGFGQGOYMXIRZOWNLADZIVQYJAJFSCVWUPFECYHSEVLFZSHFJGELTXCBGZNQYWWVVKJHREKCRNUVNSEXRWLGJV"
            },
        })
    }

    public getProduct = async (productId: string) => {
        let productInfo: any = {}
        try {
            let response = await this.http.getRaw(this.routes.getAllProductsRoute(productId))
            let productContext = await this.http.getRaw(this.routes.getProductContext(productId))
            let matchedOffers = await this.http.getRaw(this.routes.getMatchedOffers(productId))
            let productSpecification = await this.http.getRaw(this.routes.getProductSpecification(productId))
            let similarProducts = await this.http.getRaw(this.routes.getSimilarProducts(productId))
            console.info(similarProducts.data)
            productInfo = Object.assign({}, response.data, productContext.data)
            productInfo.matchedOffers = matchedOffers.data
            productInfo.productSpecification = productSpecification.data
            return productInfo
        } catch (error) {
            return error
        }
    }

    public getAllProducts = async () => {
        try {

            let response = await this.http.getRaw(this.routes.getAllProducstInfo())
            return response.data


        } catch (error) {

        }
    }



}