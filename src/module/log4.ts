import { configure, getLogger, connectLogger } from 'log4js'
import config from '../config/log.json'

configure(config)

export const loggerApp = getLogger('app')
export const loggerError = getLogger('errors')
export const loggerAccess = connectLogger(getLogger('http'), { level: 'all' })
