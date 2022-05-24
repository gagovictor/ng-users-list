import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersSearchFormComponent } from '../../components/users-search-form/users-search-form.component';
import { UsersViewMode } from '../../models/view';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit {

  public view_mode: UsersViewMode;
  @ViewChild('search_form', { static: true }) search_form: UsersSearchFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  loadMore(): void {
    this.search_form.submit(true);
  }

}
