import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

export const hlmLarge = 'text-lg font-semibold';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmLarge]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmLargeDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => hlm(hlmLarge, this.userClass()));
}
