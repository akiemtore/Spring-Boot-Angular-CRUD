import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../model/product.model";
import {ProductServiceService} from "../Services/product-service.service";
import {ProductEntity} from "../model/ProductEntity.model";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-produit',
  templateUrl: './new-produit.component.html',
  styleUrls: ['./new-produit.component.css']
})
export class NewProduitComponent implements OnInit{

   newProductFormGroup : FormGroup | undefined
  savedproduct!  : Observable<Product>

  errorMessage! : String

  constructor(private productService : ProductServiceService ,private fb:FormBuilder ,private router:Router) {
  }

  ngOnInit(): void {

    this.newProductFormGroup= this.fb.group({
      name: this.fb.control("" ,[Validators.required,Validators.minLength(4)]),
      price: this.fb.control(0 ,[Validators.required]),
      description : this.fb.control("",[Validators.maxLength(200)])
    })
  }

  saveProduit() {

  let p: ProductEntity= this.newProductFormGroup?.value;

   this.productService.saveNewProduct(p).subscribe({
     next : data => {
       alert("Produit ajoute avec succes!!!!") ;
       //this.newProductFormGroup?.reset();

       this.router.navigateByUrl("/products");
     } ,
     error : err => {
       console.log(err);
     }
   });

  }
}
