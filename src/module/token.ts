import { SignOptions, VerifyOptions, sign, verify } from 'jsonwebtoken'
import { secretJWT, signOptions, verifyOptions } from '../config/variable.json'

class Token {
  private _secretKey: string | Buffer;
  private _signOptions: SignOptions;
  private _verifyOptions: VerifyOptions;

  public constructor (secretKey: string | Buffer, signOptions?: SignOptions, verifyOptions?: VerifyOptions) {
    this._secretKey = secretKey
    this._signOptions = signOptions
    this._verifyOptions = verifyOptions
  }

  public async sign (payload: string | Buffer | object): Promise<string> {
    return sign(payload, this._secretKey, this._signOptions)
  }

  public async verify (token: string): Promise<string | object> {
    return verify(token, this._secretKey, this._verifyOptions)
  }
}

export default new Token(secretJWT, signOptions, verifyOptions)
