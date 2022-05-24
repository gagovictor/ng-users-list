import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

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

});
