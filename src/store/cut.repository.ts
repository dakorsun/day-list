import { createStore, withProps } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
} from '@ngneat/elf-entities';
import * as z from 'zod';

/**
 * @name cutEntitySchema
 * @description Cut Entity
 * @param {number} id - Number
 * @param {number} timestamp  - Exact time in Unix milliseconds */
export const cutEntitySchema = z.object({
  _id: z.number(),
  timestamp: z.number(),
});

export type CutEntity = z.infer<typeof cutEntitySchema>;

/**
 * @name cutPropsSchema
 * @description Props for Cut store*/
export const cutPropsSchema = z.object({});

export type CutProps = z.infer<typeof cutPropsSchema>;

export const store = createStore(
  { name: 'cut' },
  withProps<CutProps>({}),
  withEntities<CutEntity, '_id'>({ idKey: '_id' }),
);

export const cut$ = store.pipe(selectAllEntities());

export function setCut(cut: CutEntity[]) {
  store.update(setEntities(cut));
}

export function addCut(cut: CutEntity) {
  store.update(addEntities(cut));
}

export function updateCut(id: CutEntity['_id'], cut: Partial<CutEntity>) {
  store.update(updateEntities(id, cut));
}

export function deleteCut(id: CutEntity['_id']) {
  store.update(deleteEntities(id));
}
