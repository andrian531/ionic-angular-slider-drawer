import { Component, AfterViewInit, ElementRef, Renderer2, Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Gesture, GestureConfig } from '@ionic/core';

@Component({
  selector: 'app-slide-drawer',
  templateUrl: './slide-drawer.component.html',
  styleUrls: ['./slide-drawer.component.scss'],
})
export class SlideDrawerComponent implements AfterViewInit {
  state: string = 'bottom';
  @Input() title: string = 'Hello World';
  @Input() handleHeight: number = 138;
  @Input() status: number = 1;
  @Output() showoverlay = new EventEmitter<number>();
  ttl='';
  constructor(
    private gestureCtrl: GestureController,
    private element: ElementRef,
    private renderer: Renderer2) {}

  ngOnInit() {
    this.ttl=this.title;
  }

  async ngAfterViewInit() {
    const windowHeight = window.innerHeight;
    console.log('status',this.status);
    const drawerHeight = (windowHeight/2) - this.handleHeight; 
    // const drawerHeight = windowHeight - 118; 
    this.renderer.setStyle(this.element.nativeElement, 'top', windowHeight - this.handleHeight + 'px')  

    const options: GestureConfig = {
      el: document.querySelector('#header'),
      direction: 'y',
      gestureName: 'slide-drawer-swipe',
      onStart: (ev) => {
        // do something as the gesture begins
        console.log("start");
        this.renderer.setStyle(this.element.nativeElement, 'transition', 'none');
      },
      onMove: (ev) => {
        console.log("move");
        // do something in response to movement        
        if (ev.deltaY < 0 && this.state === 'bottom') {
          console.log("move btm");
          this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(${ev.deltaY}px)`);

        } else if (this.state === 'top') {
          console.log("move top");
          // element size is -76 then deltaY subtraction. ex. calc (2 - 76) = -74 means downward movement.
          this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(calc(${ev.deltaY}px - ${drawerHeight}px))`);
        }
      },
      onEnd: (ev) => {
        console.log("end");
        console.log('status',this.status);
        // do something when the gesture ends
        this.renderer.setStyle(this.element.nativeElement, 'transition', '0.3s ease-out');
        if (ev.deltaY < -(windowHeight / 20) && this.state === 'bottom') {
          console.log("end1");
          this.showoverlay.emit(1);
          this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(-${drawerHeight}px)`);
          this.state = 'top';
        } else if (ev.deltaY < (windowHeight / 20) && this.state === 'top') {
          console.log("end2");
          this.showoverlay.emit(1);
          this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(-${drawerHeight}px)`);
          this.state = 'top';
        } else if (ev.deltaY > (windowHeight / 20) && this.state === 'top') {
          console.log("end3");
          this.showoverlay.emit(0);
          this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(0px)');
          this.state = 'bottom';
        } else {
          console.log("end4");
          this.showoverlay.emit(0);
          this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(0px)');
          this.state = 'bottom';
        }
      }
    };
    const gesture: Gesture = await this.gestureCtrl.create(options);
    gesture.enable();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('ch',changes)
    console.log('stsx',this.status);
    if(this.status==0){
      this.showoverlay.emit(0);
      this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(0px)');
      this.state = 'bottom';
    }
  } 
}