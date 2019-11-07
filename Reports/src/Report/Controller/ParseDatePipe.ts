import { ArgumentMetadata, PipeTransform, NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';

export class ParseDatePipe implements PipeTransform<string> {
  public transform(value: string, metadata: ArgumentMetadata): DateTime {
    const dateTime = DateTime.fromISO(value);

    if (!dateTime.isValid) {
      throw new NotFoundException('Invalid date given');
    }

    return dateTime;
  }
}
