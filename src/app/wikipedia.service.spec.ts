import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { WikipediaService } from './wikipedia.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

function createResponse(body): Observable<HttpResponse<any>> {
    return of(
        body
    );
}

class MockHttp {
    get() {
        return createResponse([]);
    }
}

const articlesStub =  [{
    name: 'name',
    snippet: 'snippet',
    link: 'link',
  }];

describe('WikipediaService', () => {
    let wikipediaService: WikipediaService;
    let http: HttpClient;

    beforeEach(() => {
        const bed = TestBed.configureTestingModule({
            providers: [
                WikipediaService,
                { provide: HttpClient, useClass: MockHttp}
            ]
        });

        http = bed.inject(HttpClient);
        wikipediaService = bed.inject(WikipediaService);
    });

    it('should get cart items', () => {
        spyOn(http, 'get').and.returnValue(createResponse([...articlesStub]));

        wikipediaService.getArticles('').subscribe((articles) => {
            expect(articles.length).toEqual(1);
            expect(articles).toEqual(articlesStub);
        });
    });
});
