import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UserProfilePictureComponent } from './user-profile-picture.component';

describe('UserProfilePictureComponent', () => {
  let component: UserProfilePictureComponent;
  let fixture: ComponentFixture<UserProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatTooltipModule ],
      declarations: [ UserProfilePictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
