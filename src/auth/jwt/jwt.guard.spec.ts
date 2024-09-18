import { JwtAuthGuard } from './jwt.guard'; // Ajusta la ruta según tu estructura de carpetas

describe('JwtGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
