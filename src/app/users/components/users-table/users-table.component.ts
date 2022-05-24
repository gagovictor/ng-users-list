import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { UserFieldsDict, UserFieldsDefault } from '../../models/view';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.sass']
})
export class UsersTableComponent implements OnInit, OnDestroy {


  public users: User[] = [];
  public sorted_users: User[] = [];
  public column_names: any = UserFieldsDict;
  public loading: boolean = true;
  public active_fields: string[] = [];
  
  private subs_users: Subscription;
  private subs_fields: Subscription;

  constructor(
    private users_service: UsersService
  ) {
  }

  ngOnInit(): void {
    this.subs_users = this.users_service.usersList().subscribe((data: User[]|null) => {
      this.loading = data === null;
      this.users = data?.length ? data : [];
      this.sorted_users = this.users;
    });

    this.subs_fields = this.users_service.activeFields().subscribe((data: string[]) => {
      this.active_fields = data;
    });
  }

  ngOnDestroy(): void {
    if(this.subs_users) {
      this.subs_users.unsubscribe();
    }
    if(this.subs_fields) {
      this.subs_fields.unsubscribe();
    }
  }
  
  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sorted_users = data;
      return;
    }

    this.sorted_users = data.sort((a: User, b: User) => {
      const asc = sort.direction === 'asc';
      let va = a[sort.active as keyof User];
      let vb = b[sort.active as keyof User];
      if(typeof va === 'string' && typeof vb === 'string') {
        return this.compare(va, vb, asc);
      } else {
        return 1;
      }
    });
  }

  compare(a: number | string, b: number | string, asc: boolean) {
    return (a < b ? -1 : 1) * (asc ? 1 : -1);
  }

}
