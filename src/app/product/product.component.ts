import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from "../Services/product-service.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Product} from "../model/product.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

   products! : Observable<Array<Product>>

  errorMessage! : String

  searchFormGroup : FormGroup | undefined

  searchPriceFormGroup : FormGroup | undefined

  constructor(private productService : ProductServiceService , private  fb : FormBuilder) {

  }
  ngOnInit(): void {

     this.searchFormGroup =this.fb.group({
          keyword : this.fb.control("")
     })

    this.searchPriceFormGroup =this.fb.group({
      min : this.fb.control(0),
      max:  this.fb.control(0)
    })

    this.products =this.productService.getProducts().pipe(
      catchError( err => {
        this. errorMessage =err.message;

        return throwError(err);
      })
   )
  }

  handleSearch() {

     let kw = this.searchFormGroup?.value.keyword;
     this.products= this.productService.getProductsFromKeyword(kw).pipe(
       catchError( err => {
         this. errorMessage =err.message;

         return throwError(err);
       })
     )
  }

  handlePriceSearch() {

     let min = this.searchPriceFormGroup?.value.min;
     let max = this.searchPriceFormGroup?.value.max;
     this.products = this.productService.getProductSearchPrice(min , max).pipe(
       catchError( err => {
         this. errorMessage =err.message;

         return throwError(err);
       })
     )
  }



  deleteHandler(p: Product) {

     let deleteConfirmation = confirm("Voulez vous vraiment supprimer le produit " + p.name) ;
     if(deleteConfirmation){
       this.productService.deleteProduct(p.id).subscribe( {

           next : (resp) => {

             alert("Le produit "+ p.name +" a ete supprime avec succes !! ");
             this.products =this.products.pipe(

               map(data => {
                 let index = data.indexOf(p);
                 data.slice(index ,1);
                 return data;
               })
             )

           } ,
           error : err => {
             console.log(err);
           }
         }
       )
     }

  }
}
