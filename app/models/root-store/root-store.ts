import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { GameStoreModel } from "../game-store/game-store"
import { OngoingGameStoreModel } from "../ongoing-game-store/ongoing-game-store"
import { PlayerStoreModel } from "../player-store/player-store"
import { RoundStoreModel } from "../round-store/round-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  playerStore: types.optional(PlayerStoreModel, {} as any),
  gameStore: types.optional(GameStoreModel, {} as any),
  ongoingGameStore: types.optional(OngoingGameStoreModel, {} as any),
  roundStore: types.optional(RoundStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
