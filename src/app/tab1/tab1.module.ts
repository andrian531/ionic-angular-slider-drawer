import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SliderDrawerModule } from '../component/slide-drawer/slider-drawer.module';

@NgModule({
  entryComponents: [],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SliderDrawerModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}