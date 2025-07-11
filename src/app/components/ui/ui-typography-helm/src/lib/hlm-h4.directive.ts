import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

export const hlmH4 = 'scroll-m-20 text-xl font-semibold tracking-tight';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmH4]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmH4Directive {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => hlm(hlmH4, this.userClass()));
}
