import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmCardFooter]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardFooterDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm('flex items-center px-6 [.border-t]:pt-6', this.userClass()),
  );
}
