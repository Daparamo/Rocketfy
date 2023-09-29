import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HomePage } from './home.page';
import { UtilsService } from 'src/app/services/utils.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should return an empty user object if local storage is empty', () => {
    // Mock the getElementFromLocalStorage method
    spyOn(UtilsService, 'getElementFromLocalStorage').and.returnValue({});

    // Call the getUser method
    const result = component.getUser();

    // Expect the result to be an empty user object
    expect(result).toEqual({});
  });

});
