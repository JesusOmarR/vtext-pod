import { IOClients } from "@vtex/api";
import { Catalog } from '@vtex/clients'
import MyClient from "./products"

// Extend the default IOClients implementation with our own custom clients.

export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get Products() {
    return this.getOrSet("products", MyClient)
  }

}