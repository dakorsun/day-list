import { Routes } from '@angular/router';
import { Tracker } from '../components/tracker/tracker';

export const routes: Routes = [
  {
    title: 'root',
    path: '',
    component: Tracker,
  },
];
