import { HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { firstValueFrom, of } from 'rxjs';
import { AdminSessionService } from '../auth/admin-session.service';
import { MemberSessionService } from '../auth/member-session.service';
import { authTokenInterceptor } from './auth-token.interceptor';

describe('authTokenInterceptor', () => {
  let adminSessionMock: { token: ReturnType<typeof vi.fn> };
  let memberSessionMock: { token: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
    adminSessionMock = { token: vi.fn().mockReturnValue(null) };
    memberSessionMock = { token: vi.fn().mockReturnValue(null) };
    TestBed.configureTestingModule({
      providers: [
        { provide: AdminSessionService, useValue: adminSessionMock },
        { provide: MemberSessionService, useValue: memberSessionMock }
      ]
    });
  });

  it('should attach the bearer token on protected API calls', async () => {
    adminSessionMock.token.mockReturnValue('jwt-token');

    let receivedRequest!: HttpRequest<unknown>;

    await firstValueFrom(
      TestBed.runInInjectionContext(() =>
        authTokenInterceptor(new HttpRequest('GET', '/api/sites'), (req) => {
          receivedRequest = req;
          return of(new HttpResponse({ status: 200 }));
        })
      )
    );

    expect(receivedRequest.headers.get('Authorization')).toBe('Bearer jwt-token');
  });

  it('should not attach the token on login call', async () => {
    adminSessionMock.token.mockReturnValue('jwt-token');

    let receivedRequest!: HttpRequest<unknown>;

    await firstValueFrom(
      TestBed.runInInjectionContext(() =>
        authTokenInterceptor(new HttpRequest('POST', '/api/auth/login', {}), (req) => {
          receivedRequest = req;
          return of(new HttpResponse({ status: 200 }));
        })
      )
    );

    expect(receivedRequest.headers.has('Authorization')).toBe(false);
  });
});

