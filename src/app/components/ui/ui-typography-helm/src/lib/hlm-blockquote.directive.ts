import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

export const hlmBlockquote = 'mt-6 border-border border-l-2 pl-6 italic';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmBlockquote]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmBlockquoteDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(hlmBlockquote, this.userClass()),
  );
}
