import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent  implements OnInit {
  darkMode:BehaviorSubject<boolean>;
  constructor(private themeSvc:ThemeService) { 

  }

  ngOnInit() {
    this.darkMode = this.themeSvc.darkMode;
    this.darkMode.subscribe(darkMode=>{
      if(!darkMode){
        document.getElementById("myLogo").style.filter="invert(100%)";
        //this.themeSvc.setTheme(darkMode);
      }
      else{
        document.getElementById("myLogo").style.filter="invert(0%)";
        //this.themeSvc.setTheme(darkMode);
      }
    })
  }

}

