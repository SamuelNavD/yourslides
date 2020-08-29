import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as json2md from 'json2md';
import Reveal from 'reveal.js';

import { Marpit, Element } from '@marp-team/marpit';

import { ActivatedRoute } from '@angular/router';
import { SlideService } from 'src/app/services/slide.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-slide-projector',
  templateUrl: './slide-projector.component.html',
  styleUrls: ['./slide-projector.component.scss']
})
export class SlideProjectorComponent implements OnInit, AfterViewInit {

  public id: String;
  public sub: any;

  public content: Array<Object>;
  public html: string;
  public css: string;

  constructor(
    public route: ActivatedRoute,
    public _slideService: SlideService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    const marpit = new Marpit({
      container: [
        new Element('div', { class: 'reveal' }),
        new Element('div', { class: 'slides' }),
      ],
    })

    this.sub = this.route.params.subscribe( params => {
      this.id = params['id'];
      this._slideService.getSlide(this.id).subscribe(() => {
        this.content = [];

        this._slideService.slide.content.blocks.forEach((value) => {
          switch (value.type) {
            case 'paragraph':
              if (value.data.text != "") this.content.push({ p: value.data.text });
              break;
          }
        });

        const render = marpit.render(json2md(this.content).trim());

        this.html = render.html;
        this.css = render.css;

        document.body.innerHTML = this.html;
      });
    });
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      Reveal.initialize()
    }, 100)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getThemeStyles() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`/node_modules/reveal.js/dist/theme/${this._slideService.slide.setting}.css`);
  }

}
