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
  productListFind: IProduct[];


  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(
      data => {
        this.productList = data;
        this.productListFind = this.productList
      });
  }

  search(event) {
    let keyword = event.toLowerCase();
    this.productListFind = (keyword) ? this.filterByKeyword(keyword) : this.productList;
    console.log(this.productListFind);
  }

  filterByKeyword(keyword: string) {
    return this.productList.filter(product => {
      return product.name.toLowerCase().indexOf(keyword) != -1;
    })
  }

  deleteProduct(index) {
    const product = this.productListFind[index]
    this.productService.deleteProduct(product.id).subscribe(next =>
    this.productListFind = this.productListFind.filter(name => name.id !== product.id));
  }

}
