import { Item as _Item, ItemData as _ItemData, User as _User } from 'playbackart-server'
import { ModelInstance } from 'feathers-pinia'

declare global {
  type Item = _Item
  type ItemData = _ItemData
  type User = _User
  type Instance<T> =ModelInstance<T>
}

export {}
