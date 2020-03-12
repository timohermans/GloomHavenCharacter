import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {DungeonStorageKey} from './dungeon-counter.constants';
import * as _ from 'lodash';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-dungeon-counter',
  templateUrl: './dungeon-counter.component.html',
  styleUrls: ['./dungeon-counter.component.scss']
})
export class DungeonCounterComponent implements OnInit {
  public isBeastHpVisible = false;

  form: FormGroup;

  private defaultFormValues = {
    hp: 0,
    xp: 0,
    tokens: 0,
    kills: 0,
    hpBeast: 0
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.loadData();
    this.setupValueChanges();
  }

  private initForm() {
    this.form = this.formBuilder.group(this.defaultFormValues);
  }

  private loadData() {
    const dungeonDataJson = sessionStorage.getItem(DungeonStorageKey);

    if (dungeonDataJson) {
      const dungeonData = _.merge(_.clone(this.defaultFormValues), JSON.parse(dungeonDataJson));

      this.form.setValue(dungeonData, {emitEvent: false});
    }
  }

  private setupValueChanges() {
    this.form.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe((dungeonData) => {
        sessionStorage.setItem(DungeonStorageKey, JSON.stringify(dungeonData));
      });
  }

  reset() {
    this.form.reset(this.defaultFormValues);
    sessionStorage.removeItem(DungeonStorageKey);
  }

  public toggleBeastHp() {
    this.isBeastHpVisible = !this.isBeastHpVisible;
  }
}
