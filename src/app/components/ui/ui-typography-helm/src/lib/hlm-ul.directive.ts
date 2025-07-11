import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

export const hlmUl = 'my-6 ml-6 list-disc [&>li]:mt-2';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmUl]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmUlDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => hlm(hlmUl, this.userClass()));
}
