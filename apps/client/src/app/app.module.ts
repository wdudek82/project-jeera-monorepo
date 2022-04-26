import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from '@client/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@client/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [CoreModule, AppRoutingModule, AuthModule, BrowserAnimationsModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
