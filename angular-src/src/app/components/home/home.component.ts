import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
products;

  constructor(
   private productService:ProductService,

  ) { }

 

 AddToCart(id){
   console.log(id);
 }

 
  
  ngOnInit() {
    this.productService.getProducts().subscribe(data=>{
      this.products = data.products;
      console.log(this.products);
    
  });
}
}
