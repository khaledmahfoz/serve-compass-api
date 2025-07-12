import { AuthenticationMessages } from '@lib/messages/authentication';
import { UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

export const logout = (req: Request, res: Response): void => {
  try {
    req.session.destroy((err) => {
      if (err) throw err;
    });
    res.clearCookie('sid');
  } catch {
    throw new UnauthorizedException(AuthenticationMessages.LOGOUT_FAILED);
  }
};
