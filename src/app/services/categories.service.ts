import { Injectable } from '@angular/core';
import {Category} from '../models/Category.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categories: Array<Category> = [];
  categoriesSubject = new Subject<Array<Category>>();

  constructor() { }

  emitCategories() {
    this.categoriesSubject.next(this.categories);
  }

}
