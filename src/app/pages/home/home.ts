import { Component } from '@angular/core';
import { Tracker } from '@components/tracker/tracker';

@Component({
  selector: 'app-home',
  imports: [Tracker],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
