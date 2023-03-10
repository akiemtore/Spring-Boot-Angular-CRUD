import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from "../Services/product-service.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private productService : ProductServiceService) {
  }
  ngOnInit(): void {
  }

}
