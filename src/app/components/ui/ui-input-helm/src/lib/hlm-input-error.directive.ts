import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const inputErrorVariants = cva('text-destructive text-sm font-medium', {
  variants: {},
  defaultVariants: {},
});
export type InputErrorVariants = VariantProps<typeof inputErrorVariants>;

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hlmInputError]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmInputErrorDirective {
  public readonly userClass = input<ClassValue>('');
  protected _computedClass = computed(() =>
    hlm(inputErrorVariants(), this.userClass()),
  );
}
