import { httpService } from './http.service.js';
import { storageService } from './service.async.js';
import { utilService } from './util.service.js';
export const itemService = {
  query,
  getById,
  remove,
  save,
};

const ITEM_KEY = 'item';

async function query(filterBy = {}) {
  // return httpService.get(`item`);
  let items = await storageService.query(ITEM_KEY);
  if (!items.length) {
    items = gItems;
    utilService.saveToStorage(ITEM_KEY, items);
  }
  return items;
}

async function getById(toyId) {
  // const item = await httpService.get(`item/${toyId}`);
  // return item;
  return await storageService.get(ITEM_KEY, toyId);
}

async function remove(toyId) {
  // return httpService.delete(`item/${toyId}`);
  await storageService.remove(ITEM_KEY, toyId);
  return query();
}

async function save(item) {
  // const toyToSave = item._id ? await httpService.put(`item/ ${item._id}`, item) : await httpService.post('item', item);
  // return toyToSave;
  const toyToSave = item._id ? await storageService.put(ITEM_KEY, item) : await storageService.post(ITEM_KEY, item);
  return toyToSave;
}

const gItems = [
  {
    id: 'OXeMG8wNskc',
    title: 'metus hendrerit',
    subtitle: 'mi est eros convallis auctor arcu dapibus himenaeos',
    authors: ['Barbara Cartland'],
    publishedDate: 1999,
  },
  {
    id: 'JYOJa2NpSCq',
    title: 'morbi',
    subtitle: 'lorem euismod dictumst inceptos mi',
    authors: ['Barbara Cartland'],
    publishedDate: 1978,
  },
  {
    id: '1y0Oqts35DQ',
    title: 'at viverra venenatis',
    subtitle: 'gravida libero facilisis rhoncus urna etiam',
    authors: ['Dr. Seuss'],
    publishedDate: 1999,
  },
];
