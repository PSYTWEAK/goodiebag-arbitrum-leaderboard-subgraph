import { BigInt } from "@graphprotocol/graph-ts";
import { GoodieBag, MultiBuy } from "../generated/GoodieBag/GoodieBag";
import { User } from "../generated/schema";

export function handleMultiBuy(event: MultiBuy): void {
  let entity = User.load(event.transaction.from.toHex());

  if (!entity) {
    entity = new User(event.transaction.from.toHex());
    entity.account = event.params.account;
    entity.value = event.params.value;
  } else {
    entity.value = entity.value.plus(event.params.value);
  }

  entity.save();
}
