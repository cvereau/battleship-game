import { Component, ViewChild } from '@angular/core';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';

@Component({
  template: `
    <input posNumbersOnly />
  `
})
class TestNumbersOnlyComponent {
  @ViewChild(NumbersOnlyDirective, { static: true }) directive?: NumbersOnlyDirective;
}

describe('NumbersOnlyDirective', () => {
  let component: TestNumbersOnlyComponent;
  let fixture: ComponentFixture<TestNumbersOnlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestNumbersOnlyComponent, NumbersOnlyDirective]
    });
    fixture = TestBed.createComponent(TestNumbersOnlyComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});