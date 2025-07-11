import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmCardAction]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardActionDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm(
      'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
      this.userClass(),
    ),
  );
}
