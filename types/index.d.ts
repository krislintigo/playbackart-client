import {
  Item as _Item,
  User as _User,
  SimpleStatistic as _SimpleStatistic,
  ExtendedStatistic as _ExtendedStatistic,
  FiltersOutput as _FiltersOutput
} from 'playbackart-server'
import type { ServiceInstance } from 'feathers-pinia'

declare global {
  type Item = ServiceInstance<_Item> & _Item
  type User = ServiceInstance<_User> & _User
  type SimpleStatistic<T> = _SimpleStatistic<T>
  type ExtendedStatistic<T> = _ExtendedStatistic<T>
  type FiltersOutput = _FiltersOutput
}

export {}
