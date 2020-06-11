import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteInvestorComponent } from './invite-investor.component';

describe('InviteInvestorComponent', () => {
  let component: InviteInvestorComponent;
  let fixture: ComponentFixture<InviteInvestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteInvestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
