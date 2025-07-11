import { AfterViewInit, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HlmInputDirective } from '@components/ui/ui-input-helm/src';
import { HlmLabelDirective } from '@components/ui/ui-label-helm/src';
import { HlmFormFieldModule } from '@components/ui/ui-form-field-helm/src';
import { HlmButtonDirective } from '@components/ui/ui-button-helm/src';
import { HlmCardImports } from '@components/ui/ui-card-helm/src';
import { CutRepository } from '@state/cut.repository';

@Component({
  selector: 'app-tracker',
  imports: [
    HlmFormFieldModule,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    HlmCardImports,
    ReactiveFormsModule,
  ],
  templateUrl: './tracker.html',
  styleUrl: './tracker.css',
})
export class Tracker implements AfterViewInit {
  protected cutForm: FormGroup;
  protected cutInput = new FormControl<string>('');

  private readonly _fb = inject(FormBuilder);

  private readonly cutRepository = inject(CutRepository);

  constructor() {
    this.cutForm = this._fb.group({
      cut: this.cutInput,
    });
    this.cutForm.disable();
    this.cutForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      console.log('value changed: ', value);
      console.log('form valid: ', this.cutForm.valid);
    });
  }

  ngAfterViewInit(): void {
    this.cutForm.enable();
  }
  protected doCut() {
    console.log('submit');
    this.cutRepository.addCut({
      name: this.cutForm.value.cut as string,
      id: new Date().getTime(),
    });
  }
}
