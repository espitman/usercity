import { ApiProperty } from '@nestjs/swagger'
import { FormatResponseDto } from './format-response.dto'

function setClassName(classInst, name?: string) {
  const value = `Response-Schema-${name}`
  Object.defineProperty(classInst, 'name', {
    value
  })
}

function PipeInheritance(payloadDto, keys: string[], PrevClass) {
  if (keys.length) {
    const PayloadType = payloadDto[keys[0]]
    setClassName(PayloadType)

    class Payload extends PrevClass {
      @ApiProperty({
        type: PayloadType
      })
      // @ts-ignore
      readonly [keys[0]]
    }
    setClassName(Payload)

    keys.shift()
    return PipeInheritance(payloadDto, keys, Payload)
  }

  return PrevClass
}

export function FormatResponseFactory(payloadDto: any): any {
  let Payload
  let name: string
  try {
    new payloadDto() // tslint:disable-line
    Payload = payloadDto
    name = payloadDto.name
  } catch (err) {
    class Initial {}
    setClassName(Initial)
    const keys = Object.keys(payloadDto)
    Payload = PipeInheritance(payloadDto, keys, Initial)
  }

  class StandardResponse extends FormatResponseDto {
    @ApiProperty({
      type: Payload
    })
    readonly payload
  }
  setClassName(StandardResponse, name)
  return StandardResponse
}
