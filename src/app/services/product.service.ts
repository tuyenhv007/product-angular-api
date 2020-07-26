import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProduct} from "../iproduct";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) {
  }

  getProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.API_URL);
  }

  createProduct(product: Partial<IProduct>): Observable<IProduct> {
    return this.http.post<IProduct>(this.API_URL,product);
  }

  getProductId(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API_URL}/${id}`)
  }

  updateProduct(product: Partial<IProduct>): Observable<IProduct> {
    return this.http.patch<IProduct>(`${this.API_URL}/${product.id}`, product)
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<IProduct>(`${this.API_URL}/${id}`)
  }
}
