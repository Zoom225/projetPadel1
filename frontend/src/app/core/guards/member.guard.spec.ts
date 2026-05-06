import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemberSessionService } from '../auth/member-session.service';
import { memberGuard } from './member.guard';

describe('memberGuard', () => {
  let memberSessionMock: { isAuthenticated: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
    memberSessionMock = {
      isAuthenticated: vi.fn().mockReturnValue(false)
    };
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: MemberSessionService, useValue: memberSessionMock }
      ]
    });
  });

  it('should redirect to /member when no member session exists', () => {
    const router = TestBed.inject(Router);

    const result = TestBed.runInInjectionContext(() => memberGuard({} as never, {} as never));

    expect(result).toEqual(router.parseUrl('/member'));
  });

  it('should allow access when member session exists', () => {
    memberSessionMock.isAuthenticated.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() => memberGuard({} as never, {} as never));

    expect(result).toBe(true);
  });
});

