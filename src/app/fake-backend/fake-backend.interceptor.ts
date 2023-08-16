import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

// array in local storage for registered users
let gamesAsString = localStorage.getItem('games');
let games: any[] =  gamesAsString? JSON.parse(gamesAsString) : [];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(handleRoute)).pipe(delay(500));

    function handleRoute() {
      switch (true) {
        case url.endsWith('/game/register') && method === 'POST':
          return register();
        case url.endsWith('/games-history') && method === 'GET':
          return getGamesHistory();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function register() {
      const game = body;

      game.id = games.length ? Math.max(...games.map((x) => x.id)) + 1 : 1;
      games.push(game);
      localStorage.setItem('games', JSON.stringify(games));
      return ok();
    }

    function getGamesHistory() {        
      return ok(games);
    }

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }
  }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
