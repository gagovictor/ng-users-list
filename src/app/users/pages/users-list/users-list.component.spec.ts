import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsersCardsComponent } from '../../components/users-cards/users-cards.component';
import { UsersTableComponent } from '../../components/users-table/users-table.component';

import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Should render users-cards when 'view_mode' = 'cards'`, () => {
    const componentDebug = fixture.debugElement;
    component.view_mode = 'cards';
    fixture.detectChanges();
    const cards = componentDebug.query(By.css('users-cards'));
    const table = componentDebug.query(By.css('users-table'));
    expect(cards).toBeTruthy();
    expect(table).toBeFalsy();
  });

  it(`Should render users-table when 'view_mode' = 'table'`, () => {
    const componentDebug = fixture.debugElement;
    component.view_mode = 'table';
    fixture.detectChanges();
    const cards = componentDebug.query(By.css('users-cards'));
    const table = componentDebug.query(By.css('users-table'));
    expect(cards).toBeFalsy();
    expect(table).toBeTruthy();
  });

});
