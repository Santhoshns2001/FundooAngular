import { Component, EventEmitter, Output } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-top-nav',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,MatCardModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {

@Output() menuToggle = new EventEmitter<void>();



  toggleMenu() {
    this.menuToggle.emit();
  }

   search(event:any){
    // console.log(event.target.value)
    // this.data.outGoingData(event.target.value)
  }

}
