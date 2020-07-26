import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IProduct} from "../../iproduct";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  editForm: FormGroup;
  product: IProduct;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      sku: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      quantity: ['', [Validators.required, Validators.maxLength(10)]]
    });
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.productService.getProductId(id).subscribe(
      next => {
        this.product = next;
        this.editForm.patchValue(this.product);
      },
      error => {
        console.log(error);
        this.product = null;
      });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const {value} = this.editForm;
      const data = {
        ...this.product,
        ...value
      };
      this.productService.updateProduct(data).subscribe(next => {
        this.router.navigate(['']);
      }, error => {
        console.log(error);
      });
    }
  }

  get sku() {
    return this.editForm.get('sku');
  }

  get name() {
    return this.editForm.get('name');
  }

  get price() {
    return this.editForm.get('price');
  }

  get quantity() {
    return this.editForm.get('quantity');
  }

}
