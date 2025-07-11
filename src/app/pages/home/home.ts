import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Tracker } from '@components/tracker/tracker';
import { HlmCardImports } from '@components/ui/ui-card-helm/src';
import { CutRepository } from '@state/cut.repository';

@Component({
  selector: 'app-home',
  imports: [Tracker, HlmCardImports, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly cutRepository = inject(CutRepository);

  protected cuts$ = this.cutRepository.cut$;
}
