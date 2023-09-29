import {
  Item as _Item,
  ItemData as _ItemData,
  User as _User,
  SimpleStatistic as _SimpleStatistic,
  ExtendedStatistic as _ExtendedStatistic,
  FiltersOutput as _FiltersOutput
} from 'playbackart-server'
import { ModelInstance } from 'feathers-pinia'

declare global {
  type Item = _Item
  type ItemData = _ItemData
  type User = _User
  type Instance<T> =ModelInstance<T>
  type SimpleStatistic<T> = _SimpleStatistic<T>
  type ExtendedStatistic<T> = _ExtendedStatistic<T>
  type FiltersOutput = _FiltersOutput
}

export {}
