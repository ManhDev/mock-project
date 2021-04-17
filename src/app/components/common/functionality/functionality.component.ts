import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-functionality',
  templateUrl: './functionality.component.html',
  styleUrls: ['./functionality.component.scss']
})
export class FunctionalityComponent implements OnInit {
  @Input('showDropDown') showDropDown: boolean;
  @Input('editAndDelete') editAndDelete: boolean;
  @Output('acticeFunction') acticeFunction: EventEmitter<boolean> = new EventEmitter<boolean>()

  show = false;
  constructor() { }

  ngOnInit(): void {

  }

  showFunctinality() {
    this.show = !this.show
    this.acticeFunction.emit(this.show)
  }

}
