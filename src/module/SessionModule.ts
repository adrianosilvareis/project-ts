import { UserInterface } from '../app/models/User/UserInterface'
import { SessionInterface } from '../app/models/Session/SessionInterface'
import Session from '../app/models/Session'

export class SessionModule {
  public async createSession (user: UserInterface, token: string): Promise<SessionInterface> {
    return Session.create({ user, token })
  }

  public async getSession (user: string | object): Promise<SessionInterface> {
    return Session.findOne({ user })
  }
}
