import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from '@client/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@client/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooComponent } from './foo/foo.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
  imports: [CoreModule, AppRoutingModule, AuthModule, BrowserAnimationsModule],
  declarations: [AppComponent, FooComponent, BarComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
