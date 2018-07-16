import {Component, Output, Input, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-confirm-button',
    template: '<div>{{confirmationText}}</div>'
})
export class ConfirmButtonMockComponent {
    @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

    @Input() confirmationText: string;
    @Input() iconClass: string;
}
