import { Component } from 'angular-ts-decorators';
import { By, ComponentFixture, TestBed } from 'angularjs-testbed';
import { HEROES } from '../mock-heroes';
import { DashboardComponent } from './dashboard.component';

@Component({ selector: 'app-hero-search', template: '' })
export class HeroSearchComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService;
  let getHeroesSpy;

  beforeEach(() => {
    heroService = jasmine.createSpyObj('heroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue(Promise.resolve(HEROES));
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HeroSearchComponent
      ],
      providers: [
        { provide: 'heroService', useValue: heroService }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Top Heroes');
  });

  it('should call heroService', () => {
    expect(getHeroesSpy.calls.any()).toBe(true);
  });

  it('should display 4 links', () => {
    setTimeout(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
    }, 100);
  });

});
