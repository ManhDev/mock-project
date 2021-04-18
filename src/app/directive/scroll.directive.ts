import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollTracker]'
})
export class ScrollDirective {
  @Output() scrollingFinished = new EventEmitter<void>();
  emitted = false;

  constructor() { }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.8) {
      this.emitted = true;
      this.scrollingFinished.emit();
    }
  }

}
