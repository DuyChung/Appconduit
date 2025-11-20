import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Readmore } from './readmore';

describe('Readmore', () => {
  let component: Readmore;
  let fixture: ComponentFixture<Readmore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Readmore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Readmore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
