import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException
} from '@nestjs/common'

interface ValidationObject {
  body?: object
  params?: object
  query?: object
}

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: ValidationObject) {}

  transform(value: any, metadata: ArgumentMetadata) {
    let schema

    if (metadata.type === 'body' && this.schema.body) {
      schema = this.schema.body
    } else if (metadata.type === 'query' && this.schema.query) {
      schema = this.schema.query
    } else if (metadata.type === 'param' && this.schema.params) {
      schema = this.schema.params
    } else {
      return value
    }

    const { error } = schema.validate(value)
    if (error) {
      const { details } = error
      throw new BadRequestException('Validation failed', details)
    }
    return value
  }
}
