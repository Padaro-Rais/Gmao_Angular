import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { NgSelectModule } from '@ng-select/ng-select'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ClarityModule } from '@clr/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NotfoundComponent } from './notfound/notfound.component'

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ConfirmationPopoverModule.forRoot({ confirmButtonType: 'danger' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
