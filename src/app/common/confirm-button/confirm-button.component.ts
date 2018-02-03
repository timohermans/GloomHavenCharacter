import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { animations } from './confirm-button.animations';

import * as _ from 'lodash';

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrls: ['./confirm-button.component.scss'],
  animations: animations
})
export class ConfirmButtonComponent implements OnInit {
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

  @Input() confirmationText: string;
  @Input() iconClass: string;

  public isIconButton = true;
  public isConfirmationDialogVisible = false;

  constructor() { }

  ngOnInit(): void {
    if (_.isEmpty(this.iconClass)) {
      throw new Error(`iconClass string is needed when 'isIconButton' true`);
    }
  }

  showConfirmationDialog(): void {
    this.isConfirmationDialogVisible = true;
  }

  yesButtonClicked(): void {
    this.confirm.emit();
    this.closeConfirmationDialog();
  }

  closeConfirmationDialog(): void {
    this.isConfirmationDialogVisible = false;
  }

}
