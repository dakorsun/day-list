import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

export const hlmSmall = 'text-sm font-medium leading-none';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmSmall]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmSmallDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => hlm(hlmSmall, this.userClass()));
}
