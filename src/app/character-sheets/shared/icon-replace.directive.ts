import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Directive({
  selector: '[appIconReplace]'
})
export class IconReplaceDirective implements AfterViewInit {
  private div: HTMLDivElement;

  constructor(element: ElementRef) {
    const div = element.nativeElement as HTMLDivElement;
    this.div = div;
  }

  ngAfterViewInit(): void {
    const regex = /('.*?')/g;
    let text = this.div.innerText;
    const matches = text.match(regex);

    if (!matches || matches.length === 0) {
      return;
    }

    matches.forEach(match => {
      const icon = match.split('\'').join('');
      text = text.replace(match, `<img height="25px" width="25px" class='perk-icon' src="/assets/images/${icon}.png" />`);
    });

    this.div.innerHTML = text;
  }

}
