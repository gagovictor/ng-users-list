import { Component, Input, OnChanges } from '@angular/core';
import { User } from '../../models/user';
import { UserFieldsDict } from './../../models/view';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.sass']
})
export class UserCardComponent implements OnChanges {

  @Input() user: User;
  @Input() active_fields: string[] = [];

  public filtered_fields: string[];
  public field_names: any = UserFieldsDict;
  public full_name: string;
  public full_location: string;
  public user_fields_dict: any = UserFieldsDict;

  constructor() { }

  ngOnChanges(): void {
    let skip_fields = ['picture', 'name', 'registered_date', 'registered_age'];
    this.filtered_fields = this.active_fields.filter((col: string) => !skip_fields.includes(col))
  }

}
