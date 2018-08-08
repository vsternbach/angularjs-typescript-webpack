import { ComponentFixture, DebugElement, TestBed } from 'angularjs-testbed';
import { $PascalCaseName$Component } from './$name$';

describe('$PascalCaseName$Component', () => {
  let component: $PascalCaseName$Component;
  let fixture: ComponentFixture<$PascalCaseName$Component>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ $PascalCaseName$Component ]
    });

    fixture = TestBed.createComponent($PascalCaseName$Component);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  afterEach(() => TestBed.resetTestingModule());

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
