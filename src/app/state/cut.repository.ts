import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
} from '@ngneat/elf-entities';
import { Observable } from 'rxjs';
import z from 'zod';

/**
 * @name cutEntitySchema
 * @description Cut Entity
 * @param {number} id - Exact time in Unix milliseconds
 * @param {string} name - Name of Cut
 * */
export const cutEntitySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type CutEntity = z.infer<typeof cutEntitySchema>;

/**
 * @name cutPropsSchema
 * @description Props for Cut store*/
export const cutPropsSchema = z.object({});

export type CutProps = z.infer<typeof cutPropsSchema>;

@Injectable({ providedIn: 'root' })
export class CutRepository {
  cut$: Observable<CutEntity[]>;

  private store;

  constructor() {
    this.store = this.createStore();
    this.cut$ = this.store.pipe(selectAllEntities());
  }

  setCut(cut: CutEntity[]) {
    this.store.update(setEntities(cut));
  }

  addCut(cut: CutEntity) {
    this.store.update(addEntities(cut));
  }

  updateCut(id: CutEntity['id'], cut: Partial<CutEntity>) {
    this.store.update(updateEntities(id, cut));
  }

  deleteCut(id: CutEntity['id']) {
    this.store.update(deleteEntities(id));
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'cut' },
      withProps<CutProps>({}),
      withEntities<CutEntity, 'id'>({ idKey: 'id' }),
    );

    return store;
  }
}
