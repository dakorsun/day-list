import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmCardTitle]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardTitleDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm('leading-none font-semibold', this.userClass()),
  );
}
