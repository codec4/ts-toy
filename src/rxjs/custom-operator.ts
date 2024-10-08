import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function filterNil() {
  return function <T>(source: Observable<T>): Observable<T> {
    return new Observable((subscriber) => {
      source.subscribe({
        next(value) {
          if (value !== undefined && value !== null) {
            subscriber.next(value);
          }
        },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        }
      });
    });
  };
}
