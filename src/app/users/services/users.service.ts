import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, mapTo, Observable, of, tap } from 'rxjs';
import { serializeObject } from './../../_shared/util/string';
import { IUserData, User } from '../models/user';
import { UsersDefaultPageSize, UsersExportFormat } from '../models/view';
import { downloadDataAsFile } from 'src/app/_shared/util/file';
import { UserFieldsDefault } from './../models/view';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private page_size: number = UsersDefaultPageSize;
  private seed: string = '1234567890';
  private users_list: BehaviorSubject<User[]|null> = new BehaviorSubject<User[]|null>(null);
  private active_fields: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(UserFieldsDefault);

  constructor(
    private http: HttpClient
  ) { }

  public searchUsers(params: IUserQueryParams, increment: boolean): Observable<User[]> {
    params.results = params.results || this.page_size;
    params.seed = this.seed;
    if(params.inc) {
      // Reduce included fields to root-level name. ie: 'dob_age' and 'dob_date' become 'dob'.
      params.inc = [... new Set(params.inc.map((field: string) => field.split('_')[0]))];
    }
    let query_string = serializeObject(params);
    if(!increment) {
      this.users_list.next(null);
    }
    return this.http.get<IUserListResponse>('https://randomuser.me/api/?'+query_string).pipe(
      map((data: IUserListResponse) => {
        let dataset: IUserData[] = data?.results || [];
        let users: User[] = dataset.map((user: IUserData) => new User(user));
        if(increment && this.users_list.value) {
          this.users_list.next([
            ...this.users_list.value,
            ...users
          ]);
        } else {
          this.users_list.next(users);
        }
        return users || [];
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('UsersService:getUsers error', error);
        return of([]);
      })
    )
  }

  public exportUsers(params: IUserExportParams): Observable<boolean> {
    params.results = params.results || this.page_size;
    params.results = params.page * params.results + params.results;
    let query_string = serializeObject(params);
    
    let options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'text/'+params.format+'; charset=utf-8'
      }),
      responseType: 'text' as 'text'
    };

    return this.http.get<any>('https://randomuser.me/api/?'+query_string, options).pipe(
      tap((data: any) => {
        downloadDataAsFile(data, 'users-list', params.format);
        return true;
      }),
      mapTo(true),
      catchError((error: HttpErrorResponse) => {
        console.error('UsersService:exportUsers error', error);
        return of(false);
      })
    )
  }

  public usersList(): Observable<User[]|null> {
    return this.users_list.asObservable();
  }

  public activeFields(): Observable<string[]> {
    return this.active_fields.asObservable();
  }

  public setActiveFields(fields: string[]) {
    this.active_fields.next(fields);
  }

}

export interface IUserQueryParams {
  results?: number;
  page?: number;
  gender?: string;
  password?: string;
  seed?: string;
  format?: UsersExportFormat;
  nat?: string;
  inc?: string[];
  exc?: string[];
}

export interface IUserExportParams extends IUserQueryParams {
  page: number;
  results: number;
  format: UsersExportFormat;
}

export interface IUserListResponse {
  results: IUserData[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  }
}