import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveDesignService {

  constructor() { }

  isMobile(): Observable<boolean> {
    // Checks if screen size is less than 768 pixels
    const checkScreenSize = () => document.body.offsetWidth < 768;

    // Create observable from window resize event throttled so only fires every 500ms
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(500)).pipe(map(checkScreenSize));

    // Start off with the initial value use the isScreenSmall$ | async in the
    // view to get both the original value and the new value after resize.
    return screenSizeChanged$.pipe(startWith(checkScreenSize()))
  }
}
