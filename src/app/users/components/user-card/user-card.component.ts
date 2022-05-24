import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  public filtered_fields: string[] = [];
  public field_names: any = UserFieldsDict;
  public full_name: string;
  public full_location: string;
  public user_fields_dict: any = UserFieldsDict;
  public skip_fields: string[] = ['picture', 'name', 'registered_date', 'registered_age'];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['active_fields']) {
      this.filtered_fields = changes['active_fields'].currentValue.filter((col: string) => !this.skip_fields.includes(col));
    }
  }

}
