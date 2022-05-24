import { Component, Input } from '@angular/core';
import { IUserPicture, UserPictureSize } from '../../models/user';

@Component({
  selector: 'user-profile-picture',
  templateUrl: './user-profile-picture.component.html',
  styleUrls: ['./user-profile-picture.component.sass']
})
export class UserProfilePictureComponent {

  @Input() data: IUserPicture;
  @Input() size: UserPictureSize;
  @Input() desc: string;
  
  constructor(
  ) { }

}
