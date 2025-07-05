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
 * @name _cutEntitySchema
 * @description Cut Entity
 * @param {number} id - Number
 * @param {number} timestamp  - Exact time in Unix milliseconds */
export const _cutEntitySchema = z.object({
  _id: z.number(),
  timestamp: z.number(),
});

export type _CutEntity = z.infer<typeof _cutEntitySchema>;

/**
 * @name _cutPropsSchema
 * @description Props for Cut store*/
export const _cutPropsSchema = z.object({});

export type _CutProps = z.infer<typeof _cutPropsSchema>;

export const store = createStore(
  { name: 'cut' },
  withProps<_CutProps>({}),
  withEntities<_CutEntity, '_id'>({ idKey: '_id' }),
);

export const cut$ = store.pipe(selectAllEntities());

export function setCut(cut: _CutEntity[]) {
  store.update(setEntities(cut));
}

export function addCut(cut: _CutEntity) {
  store.update(addEntities(cut));
}

export function updateCut(id: _CutEntity['_id'], cut: Partial<_CutEntity>) {
  store.update(updateEntities(id, cut));
}

export function deleteCut(id: _CutEntity['_id']) {
  store.update(deleteEntities(id));
}
