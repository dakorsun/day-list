import { AfterViewInit, Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tracker',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './tracker.html',
  styleUrl: './tracker.css',
})
export class Tracker implements AfterViewInit {
  protected cutForm: FormGroup;
  protected cutInput = new FormControl('');

  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.cutForm = this._fb.group({ cut: this.cutInput });
    this.cutForm.disable();
    this.cutForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      console.log('value changed: ', value);
    });
  }

  ngAfterViewInit(): void {
    this.cutForm.enable();
  }
}
