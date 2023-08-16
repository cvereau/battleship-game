import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[posNumbersOnly]',
  standalone: true
})
export class NumbersOnlyDirective {
  private readonly regexNumbers = /^[0-9]*$/;

  constructor() {}

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    // Allow only to paste numeric values
    event.preventDefault();
    const pastedInput: string =
      event.clipboardData?.getData('text/plain') || '';
    if (this.regexNumbers.test(pastedInput)) {
      document.execCommand('insertText', false, pastedInput);
    }
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    // Allow only to drop numeric values
    event.preventDefault();
    const textData = event.dataTransfer?.getData('text');
    if (this.regexNumbers.test(textData || '')) {
      (event.target as HTMLInputElement).focus();
      document.execCommand('insertText', false, textData);
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const keyPressed = event.key.toLowerCase();
    // Allow: Delete, Backspace, Tab, Escape, Enter
    if (
      [
        'delete',
        'backspace',
        'tab',
        'escape',
        'enter',
        'arrowleft',
        'arrowright',
      ].indexOf(keyPressed) !== -1 ||
      // Allow: Ctrl+A
      (keyPressed === 'a' && event.ctrlKey === true) ||
      // Allow: Ctrl+C
      (keyPressed === 'c' && event.ctrlKey === true) ||
      // Allow: Ctrl+V
      (keyPressed === 'v' && event.ctrlKey === true) ||
      // Allow: Ctrl+X
      (keyPressed === 'x' && event.ctrlKey === true)
    ) {
      // let it happen, don't do anything
      return;
    }
    if (this.regexNumbers.test(event.key)) {
      return;
    }

    event.preventDefault();
  }
}
