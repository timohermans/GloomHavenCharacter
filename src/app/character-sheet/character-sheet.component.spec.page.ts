import {ComponentFixture} from '@angular/core/testing';
import {CharacterSheetComponent} from './character-sheet.component';
import {BasePage} from '../base.spec.page';

export class Page extends BasePage<CharacterSheetComponent> {
    get xpPlusFive(): HTMLButtonElement {
        return this.fixture.nativeElement.querySelector('[data-test-id="xpPlusFive"]');
    }

    get currentLevelLabel(): HTMLElement {
        return this.query('#levels .current-level [data-test-id="level"]');
    }

    constructor(
        fixture: ComponentFixture<CharacterSheetComponent>
    ) {
        super(fixture);
    }
}
