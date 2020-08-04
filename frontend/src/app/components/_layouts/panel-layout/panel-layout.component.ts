import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.scss']
})
export class PanelLayoutComponent implements OnInit {

  user: User;
  
  constructor(
    public _userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this._userService.user;
  }

  animateCSS(element: string, animation: string, prefix: string = 'animate__') {
    // We create a Promise and return it
    return new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = document.querySelector(element);

      node.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd() {
        node.classList.remove(`${prefix}animated`, animationName);
        node.removeEventListener('animationend', handleAnimationEnd);

        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd);
    });
  }

  toggleMenu(element: string, animation_in: string, animation_out: string) {
    const node = document.querySelector(element);
    if (node.classList.contains('open')) {
      this.animateCSS(element, animation_out).then(() => {
        node.classList.remove('open');
      });
    } else {
      node.classList.add('open');
      this.animateCSS(element, animation_in).then(() => {
      });
    }
  }
}
