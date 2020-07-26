import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../iproduct";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productList: IProduct[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(
      next =>
        (this.productList = next),
      error =>
        (this.productList = []));
  }

  deleteProduct(index) {
    const product = this.productList[index]
    this.productService.deleteProduct(product.id).subscribe(next =>
    this.productList = this.productList.filter(name => name.id !== product.id));
  }

}
