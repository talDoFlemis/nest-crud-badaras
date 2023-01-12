import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Tobaianor } from './entities/tobaianor.entity';

@EventSubscriber()
export class TobaianorSubscriber
  implements EntitySubscriberInterface<Tobaianor>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Tobaianor;
  }

  beforeInsert(event: InsertEvent<Tobaianor>) {
    console.log(`Before tobaianor be inserted: `, event.entity);
  }

  afterInsert(event: InsertEvent<Tobaianor>) {
    console.log(`after tobaianor be inserted: `, event.entity);
  }
}
