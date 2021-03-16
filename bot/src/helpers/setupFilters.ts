import { WorkerManager } from '../managers/Worker'

import { MessageHandler } from '../filters/Messages'
import { APIMessage } from 'discord-api-types'

export function setupFilters (worker: WorkerManager): void {
  worker.on('MESSAGE_CREATE', (msg) => {
    void MessageHandler(worker, msg)
  })
  worker.on('MESSAGE_UPDATE', (msg) => {
    void MessageHandler(worker, msg as APIMessage)
  })
}