import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { MultiBuy } from "../generated/GoodieBag/GoodieBag"

export function createMultiBuyEvent(account: Address, value: BigInt): MultiBuy {
  let multiBuyEvent = changetype<MultiBuy>(newMockEvent())

  multiBuyEvent.parameters = new Array()

  multiBuyEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  multiBuyEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return multiBuyEvent
}
