import { Reflector } from '@nestjs/core';

import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    // Mock Reflector
    reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(['admin']),
    } as any;

    rolesGuard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  it('should return true if no roles are required', () => {
    // Set up a mock context
    const context = {
      switchToHttp: () => ({ getRequest: () => ({ user: { roles: [] } }) }),
    } as any;

    expect(rolesGuard.canActivate(context)).toBe(true);
  });

  it('should return true if the user has the required role', () => {
    const context = {
      switchToHttp: () => ({ getRequest: () => ({ user: { roles: ['admin'] } }) }),
    } as any;

    expect(rolesGuard.canActivate(context)).toBe(true);
  });

  it('should return false if the user does not have the required role', () => {
    const context = {
      switchToHttp: () => ({ getRequest: () => ({ user: { roles: ['user'] } }) }),
    } as any;

    expect(rolesGuard.canActivate(context)).toBe(false);
  });
});
