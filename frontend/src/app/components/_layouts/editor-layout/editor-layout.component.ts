import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlideService } from 'src/app/services/slide.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(5px)', opacity: 0}),
          animate('100ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('100ms', style({transform: 'translateX(-5px)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class EditorLayoutComponent implements OnInit, OnDestroy {

  public id: String;
  public sub: any;

  constructor(
    private route: ActivatedRoute,
    public _slideService: SlideService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => this.id = params['id'] );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleMenu(id: string) {
    var element = document.getElementById(id).classList;
    if (element.contains('open')) {
      element.remove('open');
      setTimeout(() => {
        element.add('hide');
      }, 100);
    } else {
      element.remove('hide');
      setTimeout(() => {
        element.add('open');
      }, 1);
    }
  }

}
