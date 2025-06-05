import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getRole']);
    const routeSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routeSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access when logged in and role is pelanggan', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getRole.and.returnValue('pelanggan');

    const mockRoute: any = { data: { roles: ['pelanggan'] } };
    const mockState: any = {};

    expect(guard.canActivate(mockRoute, mockState)).toBeTrue();
  });

  it('should allow access when logged in and role is pelayan', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getRole.and.returnValue('pelayan');

    const mockRoute: any = { data: { roles: ['pelayan'] } };
    const mockState: any = {};

    expect(guard.canActivate(mockRoute, mockState)).toBeTrue();
  });

  it('should block access and redirect if not logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);
    const mockRoute: any = { data: { roles: ['pelanggan', 'pelayan'] } };
    const mockState: any = {};

    expect(guard.canActivate(mockRoute, mockState)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should block access and redirect if role not matched', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getRole.and.returnValue('koki'); // role yang tidak valid

    const mockRoute: any = { data: { roles: ['pelanggan', 'pelayan'] } };
    const mockState: any = {};

    expect(guard.canActivate(mockRoute, mockState)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});