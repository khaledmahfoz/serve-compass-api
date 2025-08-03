import { ISerializedUser } from '@interfaces/users/serialized-user';
import { IUser } from '@interfaces/users/user';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: IUser,
    done: (err: Error | null, user: ISerializedUser) => void,
  ): void {
    done(null, { id: user.id });
  }

  deserializeUser(
    payload: string,
    done: (err: Error | null, payload: string) => void,
  ): void {
    done(null, payload);
  }
}
