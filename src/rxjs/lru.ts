import {
  BehaviorSubject,
  merge,
  Observable,
  of,
  OperatorFunction,
  pairs
} from 'rxjs';
import { map, pairwise, switchMap, withLatestFrom } from 'rxjs/operators';

interface LruItem<T> {
  value: T;
  lastUsed: Date;
}

interface LruStore<T> {
  [key: string]: LruItem<T>;
}

interface Lru<T> {
  store: LruStore<T>;
  // readonly bucketSize: number;
  bucketSize: number;
  has(id: string): boolean;
  get(id: string): LruItem<T> | undefined;
  getValue(id: string): T | undefined;
  set(id: string, value: T): void;
  delete(id: string): void;
}

const DEFAULT_BUCKET_SIZE = 2;

class Lru<T> implements Lru<T> {
  store = {} as LruStore<T>;
  size = 0;
  bucketSize = DEFAULT_BUCKET_SIZE;

  constructor(size?: number) {
    this.bucketSize = size ? size : DEFAULT_BUCKET_SIZE;
  }

  has(id: string): boolean {
    if (this.store[id]) {
      return true;
    }

    return false;
  }

  get(id: string): LruItem<T> | undefined {
    this.store[id].lastUsed = new Date();

    return this.store[id];
  }

  getValue(id: string): T | undefined {
    return this.store[id].value;
  }

  set(id: string, value: T): void {
    if (!this.store[id] && this.size <= this.bucketSize) {
      this.store[id] = { value, lastUsed: new Date() };
      this.size++;
    }
  }

  delete(id: string): void {
    delete this.store[id];
  }
}

interface Get<T> {
  (id: string): Observable<T>;
}

interface LruCacheFn<R> {
  (project: Get<R>): OperatorFunction<string, R>;
}

interface Person {
  id: number;
  name: string;
}

const subject = new BehaviorSubject<Record<string, Person>>({
  '1': {
    id: 1,
    name: 'First'
  },
  '2': {
    id: 2,
    name: 'Second'
  },
  '3': {
    id: 3,
    name: 'Third'
  },
  '4': {
    id: 4,
    name: 'Fourth'
  }
});

const lruCache = new Lru();

function get(id: string): Observable<Person | undefined> {
  return subject.pipe(map((x) => x[id]));
}

function lru<T extends Person = any>(
  project: Get<T>
): OperatorFunction<string, T> {
  return function (source: Observable<string>): Observable<T> {
    return source.pipe<T>(
      switchMap((value) => {
        return project(value).pipe(
          map((person: any) => {
            if (!lruCache.has(person.id)) {
              lruCache.set(person.id, person);
              return person;
            }

            console.log('Returning from cache');
            return lruCache.get(person.id).value;
          })
        );
      })
    );
  };
}
// of('1', '1', '2', '2', '3', '1').pipe(lru(get)).subscribe(console.log);
export const testLru = of('1', '1', '2', '2', '3', '1').pipe(lru(get));
