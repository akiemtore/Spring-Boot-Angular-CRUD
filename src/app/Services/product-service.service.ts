import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {ProductEntity} from "../model/ProductEntity.model";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

 BackendHost :string = "http://localhost:8080"

  constructor(private http : HttpClient) {}

  public getProducts() : Observable <Array<Product>> {

    return  this.http.get<Array<Product>>(this.BackendHost+"/products");
  }

  public getProductsFromKeyword(kw : String ) : Observable <Array<Product>>{

    return this.http.get<Array<Product>>(this.BackendHost+"/products/search?keyword="+kw);
  }

 public  getProductSearchPrice(min: number, max: number) : Observable <Array<Product>> {

   return this.http.get<Array<Product>>(this.BackendHost+"/products/range?min="+min+"&max="+max);
  }

  public saveNewProduct(p :  ProductEntity) : Observable <Product> {

   return this.http.post<Product>(this.BackendHost+"/products" ,p);
  }

  public deleteProduct(id: string)   {

    return this.http.delete(this.BackendHost+"/products/"+id);
  }

  public  findProduct(id: string | null) : Observable<Product> {

   return this.http.get<Product>(this.BackendHost+"/products/"+id)
  }
}
