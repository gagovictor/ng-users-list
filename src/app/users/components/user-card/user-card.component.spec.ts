import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '../../models/user';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Should receive 'user' as instance of User class.`, () => {
    const user: User = fixture.componentInstance.user;
    console.log('user instanceof User',user instanceof User);
    expect(user instanceof User).toBeTruthy();
  });
});
