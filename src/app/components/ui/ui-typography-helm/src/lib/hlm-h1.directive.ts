import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

export const hlmH1 =
  'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmH1]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmH1Directive {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => hlm(hlmH1, this.userClass()));
}
