import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {IProduct} from "../../iproduct";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  formAdd: FormGroup;
  productList: IProduct[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formAdd = this.formBuilder.group({
      sku: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      quantity: ['', [Validators.required, Validators.maxLength(10)]]
    })
  }

  onSubmit() {
    if (this.formAdd.valid) {
      const {value} = this.formAdd;
      this.productService.createProduct(value).subscribe(next => {
        this.productList.unshift(next);
        this.formAdd.reset();
        }, error => console.log(error));
      this.router.navigate(['']);
    }
  }

  get sku() {
    return this.formAdd.get('sku')
  }

  get name() {
    return this.formAdd.get('name')
  }

  get price() {
    return this.formAdd.get('price')
  }

  get quantity() {
    return this.formAdd.get('quantity')
  }


}
