import { Component,ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  status=0;
  showov=false;
  constructor(private cd: ChangeDetectorRef) {}
  showOverlay(val) {
    if(val==1){
      this.showov=true;
      this.status=1;
    }else{
      this.showov=false;
      this.status=0;
    }
    this.cd.detectChanges();
    console.log("overlay:",val,this.showov);
  }
  hideov(){
    
    this.showov=false;
    this.status=0;
    console.log('click',this.status,this.showov);
  }
}
