import { ComponentFixture, TestBed } from 'angularjs-testbed';
import { HEROES } from '../mock-heroes';
import { HeroSearchComponent } from './hero-search.component';


describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroService;
  let searchHeroesSpy;

  beforeEach(() => {
    heroService = jasmine.createSpyObj('heroService', ['searchHeroes']);
    searchHeroesSpy = heroService.searchHeroes.and.returnValue(Promise.resolve(HEROES));
    TestBed.configureTestingModule({
      declarations: [
        HeroSearchComponent
      ],
      providers: [
        { provide: 'heroService', useValue: heroService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Hero Search" as headline', () => {
    expect(fixture.nativeElement.querySelector('h4').textContent).toEqual('Hero Search');
  });
});
