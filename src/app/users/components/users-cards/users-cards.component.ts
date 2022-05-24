import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { UserFieldsDefault } from '../../models/view';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-cards',
  templateUrl: './users-cards.component.html',
  styleUrls: ['./users-cards.component.sass']
})
export class UsersCardsComponent implements OnInit, OnDestroy {

  
  public users: User[] = [];
  public loading: boolean = true;
  public active_fields: string[] = [];
  private subs_users: Subscription;
  private subs_fields: Subscription;

  constructor(
    private users_service: UsersService
  ) { }

  ngOnInit(): void {
    this.subs_users = this.users_service.usersList().subscribe((data: User[]|null) => {
      this.loading = data === null;
      this.users = data?.length ? data : [];
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

}
