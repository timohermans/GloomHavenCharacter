import {Component, OnInit, Input, forwardRef} from '@angular/core';
import {FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {disableDebugTools} from '@angular/platform-browser/src/browser/tools/tools';

@Component({
  selector: 'app-custom-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCounterComponent),
      multi: true
    }
  ]
})
export class CustomCounterComponent implements ControlValueAccessor {
  @Input() labelText: string;

  counter = 0;
  isDisabled = false;

  writeValue(counter: number): void {
    this.counter = counter;
    this.onChange(counter);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  constructor() {}

  setAmount(amountToChange) {
    const newCounter = this.counter + amountToChange;
    this.writeValue(newCounter);
  }

  onChange(counter: number) {
  }

  onTouched() {
  }
}
