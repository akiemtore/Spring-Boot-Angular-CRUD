import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from "../Services/product-service.service";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductEntity} from "../model/ProductEntity.model";


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId: string | null = ""

  paramObj! : object
  retrieveProduct! : Observable<Product>

  ProductFormGroup : FormGroup | undefined

  constructor(private productService : ProductServiceService , private activeRoute : ActivatedRoute , private fb : FormBuilder
                , private router : Router) {


  }
  ngOnInit(): void {
    this.paramObj= this.activeRoute.paramMap.subscribe( param =>{
      this.productId= param.get("id");
       this.productService.findProduct(this.productId).subscribe(
          (data) => {
            this.ProductFormGroup= this.fb.group({
              name: this.fb.control(data.name),
              price: this.fb.control(data.price),
              description : this.fb.control(data.description)
            })
      } ,
         (err) => {
           console.log(err);
      }
       )
    }) ;


  }

  saveUpdate() {
   let p : ProductEntity =  this.ProductFormGroup?.value;
    this.productService.updateProduct(p , this.productId).subscribe(
       data =>{
        alert("Le produit "+ data.id+ " a ete mis a jour avec succes !!1") ;

          this.router.navigateByUrl("/products");
    } , error => {
         console.log(error)
      }
    )
  }
}
