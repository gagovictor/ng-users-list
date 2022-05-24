import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatMenu } from '@angular/material/menu';
import { UserFieldsDict, UserFields, UsersDefaultPageIndex, UsersDefaultInfiniteScrollOffset } from '../../models/view';
import { UserFieldsDefault, UsersDefaultPageSize, UsersExportFormat, UsersViewMode } from '../../models/view';
import { UsersService } from '../../services/users.service';
import { countries } from '../../../_shared/data/countries';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'users-search-form',
  templateUrl: './users-search-form.component.html',
  styleUrls: ['./users-search-form.component.sass']
})
export class UsersSearchFormComponent implements OnInit {

  public form: FormGroup;
  public user_fields: any = UserFieldsDict;
  public loading: boolean = false;
  public view_mode: UsersViewMode = 'table';
  public export_menu: MatMenu;
  public countries: any = countries;
  private infinite_scroll_offset: number = UsersDefaultInfiniteScrollOffset;

  @Output() changedView: EventEmitter<UsersViewMode> = new EventEmitter<UsersViewMode>();

  constructor(
    private fb: FormBuilder,
    private service: UsersService
  ) {
    this.form = this.fb.group({
      page:    [UsersDefaultPageIndex],
      results: [UsersDefaultPageSize],
      gender:  [null],
      nat:     [null],
      inc:     [UserFieldsDefault]
    });
    this.submit();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.changedView.emit(this.view_mode);
    this.updateFields(UserFieldsDefault);
  }

  submit(increment: boolean = false): boolean {
    if(this.loading) {
      return false;
    }
    this.loading = true;
    if(!increment) {
      this.f['page'].setValue(UsersDefaultPageIndex);
    }
    this.service.searchUsers(this.form.value, increment).subscribe(() => {
      this.loading = false;
    });
    return true;
  }

  updateView(mode: UsersViewMode): void {
    this.view_mode = mode;
    this.changedView.emit(this.view_mode);
  }

  updateFields(fields: string[]): void {
    fields.sort((a: string, b: string) => UserFields.indexOf(a) < UserFields.indexOf(b) ? -1 : 1);
    this.service.setActiveFields(fields);
    this.submit();
  }

  exportTo(format: UsersExportFormat): void {
    this.loading = true;
    this.service.exportUsers({...this.form.value, format: format}).subscribe(() => {
      this.loading = false;
    });
  }
  
  @HostListener('window:scroll', ['$event'])
    onWindowScroll(): void {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if(pos >= max - this.infinite_scroll_offset ) {
      this.f['page'].setValue(this.f['page'].value + 1);
      this.submit(true);
    }
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

}
