import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

export const hlmP = 'leading-7 [&:not(:first-child)]:mt-6';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmP]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmPDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => hlm(hlmP, this.userClass()));
}
