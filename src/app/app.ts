import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@components/header/header';
import { Layout } from './layout/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Layout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'day-list';
}
