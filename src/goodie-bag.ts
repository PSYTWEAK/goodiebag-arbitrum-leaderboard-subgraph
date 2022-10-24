import { BigInt } from "@graphprotocol/graph-ts";
import { GoodieBag, MultiBuy } from "../generated/GoodieBag/GoodieBag";
import { Social, UpdatedStratergy } from "../generated/Social/Social";
import { User, Stratergy } from "../generated/schema";

export function handleMultiBuy(event: MultiBuy): void {
  let entity = User.load(event.transaction.from.toHex());

  if (!entity) {
    entity = new User(event.transaction.from.toHex());
    entity.totalVolume = event.params.value;
    entity.totalBuys = BigInt.fromI32(1);
  } else {
    entity.totalVolume = entity.totalVolume.plus(event.params.value);
    entity.totalBuys = entity.totalBuys.plus(BigInt.fromI32(1));
  }

  entity.save();
}

export function handleStratergy(event: UpdatedStratergy): void {
  let stratergy = Stratergy.load(event.params.id.toHex());

  if (!stratergy) {
    stratergy = new Stratergy(event.params.id.toHex());

  }

  stratergy.name = event.params.name;
  stratergy.description = event.params.description;
  for (let i = 0; i < event.params.tokens.length; i++) {
    stratergy.tokens.push(event.params.tokens[i].toString());
  }
  stratergy.creator = event.params.creator.toHex();
  stratergy.fee = event.params.fee;


  stratergy.save();

  let user = User.load(event.transaction.from.toHex());

  if (!user) {
    user = new User(event.transaction.from.toHex());
  }
  user.stratergies = [stratergy.id];


  user.save();
}

