import { TestBed } from 'angularjs-testbed';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
    service = TestBed.get(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
