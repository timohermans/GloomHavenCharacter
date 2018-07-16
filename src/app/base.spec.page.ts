import {ComponentFixture} from '@angular/core/testing';

export class BasePage<T> {
    constructor(
        protected fixture: ComponentFixture<T>
    ) {}

    protected query(query: string): HTMLElement {
        return this.fixture.nativeElement.querySelector(query);
    }

    public hasText(text: string, element: HTMLElement): void {
        // expect(_.trim(element.innerHTML, '\r\n ')).toBe(text);
    }
}
