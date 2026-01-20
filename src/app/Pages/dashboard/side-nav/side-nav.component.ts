import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'app-side-nav',
  imports: [MatIconModule,MatSidenavModule,MatNavList,CommonModule,RouterModule,MatDividerModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {

    @Input() expanded: boolean = false;

    
  openEditLabels() {
    console.log('Edit labels clicked');
    // later → open dialog
  }


}
