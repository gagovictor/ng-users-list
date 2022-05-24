import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UserCardComponent } from './components/user-card/user-card.component';
import { UserProfilePictureComponent } from './components/user-profile-picture/user-profile-picture.component';
import { UsersCardsComponent } from './components/users-cards/users-cards.component';
import { UsersSearchFormComponent } from './components/users-search-form/users-search-form.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UsersService } from './services/users.service';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    UserCardComponent,
    UserProfilePictureComponent,
    UsersCardsComponent,
    UsersTableComponent,
    UsersSearchFormComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    UsersRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
