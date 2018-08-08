import { ComponentFixture, TestBed } from 'angularjs-testbed';
import { HEROES } from '../mock-heroes';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService;
  let getHeroesSpy;

  beforeEach(() => {
    heroService = jasmine.createSpyObj('heroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue(Promise.resolve(HEROES));
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      providers: [
        { provide: 'heroService', useValue: heroService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
