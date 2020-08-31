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
        const head = document.getElementsByTagName('head')[0];

        let themeLink = document.getElementById(
          'client-theme'
        ) as HTMLLinkElement;
        if (themeLink) {
          themeLink.href = '/assets/slides-themes/' + this._slideService.slide.setting + '.css';
        } else {
          const style = document.createElement('link');
          style.id = 'client-theme';
          style.rel = 'stylesheet';
          style.type = 'text/css';
          style.href = '/assets/slides-themes/' + this._slideService.slide.setting + '.css';

          head.appendChild(style);
        }

        this.content = [];

        this._slideService.slide.content.blocks.forEach((value) => {
          switch (value.type) {
            case 'paragraph':
              if (value.data.text != "") this.content.push({ p: value.data.text });
              break;

            case 'header':
              if (value.data.text != "") {
                switch (value.data.level) {
                  case 1:
                    this.content.push({ h1: value.data.text });
                    break;
                  case 2:
                    this.content.push({ h2: value.data.text });
                    break;
                  case 3:
                    this.content.push({ h3: value.data.text });
                    break;
                  case 4:
                    this.content.push({ h4: value.data.text });
                    break;
                  case 5:
                    this.content.push({ h5: value.data.text });
                    break;
                  case 6:
                    this.content.push({ h6: value.data.text });
                    break;
                }
              }
              break;
            
            case 'delimiter':
              this.content.push({ p: '---' });
              break;

            case 'image':
              this.content.push({ img: { title: value.data.caption, source: value.data.file.url } });
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
      Reveal.initialize({
        width: "100% - 50px",
        height: "100%",
        margin: 0,
        minScale: 1,
        maxScale: 1,
        disableLayout: false,
        center: false,
        backgroundTransition: 'slide'
      }).then(() => {
        var headers1 = document.getElementsByTagName('h1');
        for (let i = 0; i < headers1.length; i++) {
          headers1[i].parentElement.classList.add('title');
        }

        var headers2 = document.getElementsByTagName('h2');
        for (let i = 0; i < headers2.length; i++) {
          headers2[i].parentElement.classList.add('section');
        }

        var images = document.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
          images[i].parentElement.classList.add('image-container');
        }
      });
    }, 100)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getThemeStyles() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`/src/assets/slides-themes/${this._slideService.slide.setting}.css`);
  }

}
