import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UsersTableComponent } from './users-table.component';
import { UsersService } from '../../services/users.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UsersMockResults } from '../../data/users-mock';
import { IUserData, User } from '../../models/user';
import { By } from '@angular/platform-browser';
import { UserFieldsDefault } from '../../models/view';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
      ],
      declarations: [ UsersTableComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        UsersService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Should render a number of rows equal to the length of 'sorted_users'`, fakeAsync(() => {
    var componentDebug = fixture.debugElement;
    component.users = [];
    component.active_fields = UserFieldsDefault;
    UsersMockResults.forEach((result: IUserData) => {
      component.users.push(new User(result));
    });
    component.sorted_users = component.users;
    component.data_source.data = component.sorted_users;
    fixture.detectChanges();
    let rows = componentDebug.queryAll(By.css('tbody .mat-row'));
    expect(rows.length).toBe(component.sorted_users.length);
    component.users.splice(5, 2);
    component.sorted_users = component.users;
    component.data_source.data = component.sorted_users;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      componentDebug = fixture.debugElement;
      rows = componentDebug.queryAll(By.css('tbody .mat-row'));
      expect(rows.length).toBe(component.sorted_users.length);
    });
  }));

});
