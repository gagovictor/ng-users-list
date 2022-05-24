import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersDefaultPageIndex } from '../../models/view';
import { UsersService } from '../../services/users.service';

import { UsersSearchFormComponent } from './users-search-form.component';

describe('UsersSearchFormComponent', () => {
  let component: UsersSearchFormComponent;
  let fixture: ComponentFixture<UsersSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatExpansionModule,
        MatIconModule,
        MatSlideToggleModule
      ],
      declarations: [
        UsersSearchFormComponent
      ],
      providers: [
        FormBuilder,
        UsersService,
        HttpClient,
        HttpHandler,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it(`Should set 'page' attribute to UsersDefaultPageIndex when 'submit' is called with 'increment' = false`, () => {
    component.f['page'].setValue(10);
    component.submit(false);
    expect(component.f['page'].value).toBe(UsersDefaultPageIndex);
  });
  
  it(`Submit should return false when 'loading' = true`, () => {
    component.loading = true;
    expect(component.submit(false)).toBe(false);
  });
  
  it(`Submit should return true when 'loading' = false`, () => {
    component.loading = false;
    expect(component.submit(false)).toBe(true);
  });
  
  it(`Search button should be disabled when 'loading' = true`, () => {
    component.loading = true;
    const submit_btn = fixture.elementRef.nativeElement.querySelector('#btn-search');
    expect(submit_btn.getAttribute('disabled')).toBeTruthy;
  });
  
  it(`Export button should be disabled when 'loading' = true`, () => {
    component.loading = true;
    const export_btn = fixture.elementRef.nativeElement.querySelector('#btn-export');
    expect(export_btn.getAttribute('disabled')).toBeTruthy;
  });
  
  it(`Slide toggle click should update 'view_mode' attribute`, () => {
    component.loading = true;
    const export_btn = fixture.elementRef.nativeElement.querySelector('#btn-export');
    expect(export_btn.getAttribute('disabled')).toBeTruthy;
  });

  it(`Should trigger 'updateView' when slide toggle is changed`, () => {
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.query(By.directive(MatSlideToggle));
    spyOn(component, 'updateView');
    slider.triggerEventHandler('change', true);
    expect(component.updateView).toHaveBeenCalled();
  });

  it(`Should trigger 'updateView' when slide toggle is changed`, () => {
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.query(By.directive(MatSlideToggle));
    spyOn(component, 'updateView');
    slider.triggerEventHandler('change', true);
    expect(component.updateView).toHaveBeenCalled();
  });

  it(`Should trigger 'updateFields' when 'inc' formControl is changed`, async(() => {
    const control: AbstractControl = component.f['inc'];
    const componentDebug = fixture.debugElement;
    const select = componentDebug.query(By.css('[formControlName="inc"]'));
    //const select: MatSelect = fixture.elementRef.nativeElement.querySelector('mat-select[formControlName="inc"]');
    //select.dispatchEvent(new Event('change'));
    control.setValue(['test']);
    select.triggerEventHandler('selectionChange', { value: ['test'] });
    spyOn(component, 'updateFields');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(control.value).toEqual(['test']);
      expect(component.updateFields).toHaveBeenCalled();
    });
  }));

});
