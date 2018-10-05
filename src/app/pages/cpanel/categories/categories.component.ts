import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../../../services/categories.service';
import {Category} from '../../../models/Category.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy{

  public categories: Category[] = [];
  public categoriesSubscription: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesSubscription = this.categoriesService.categoriesSubject.subscribe((data: Array<Category>) => {
      this.categories = data;
    });
    this.categoriesService.emitCategories();
  }
  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }

}
