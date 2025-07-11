import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

export const hlmMuted = 'text-sm text-muted-foreground';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmMuted]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmMutedDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => hlm(hlmMuted, this.userClass()));
}
