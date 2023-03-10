import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {ProductServiceService} from "../Services/product-service.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit{

  productId: string | null = ""

  paramObj! : object
  retrieveProduct! : Observable<Product>

  constructor(private productService: ProductServiceService , private activeRoute : ActivatedRoute) {
  }
  ngOnInit(): void {

    this.paramObj= this.activeRoute.paramMap.subscribe( param =>{
      this.productId= param.get("id");
     this.retrieveProduct = this.productService.findProduct(this.productId) ;
    }) ;


  }


}
