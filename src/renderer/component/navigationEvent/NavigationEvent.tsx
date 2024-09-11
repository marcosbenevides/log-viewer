import { IFirebaseLog } from '../../model/IFirebaseLog';
import './NavigationEvent.css';

export interface INavigationEvent {
  item: IFirebaseLog;
}

export function NavigationEvent({ item }: INavigationEvent) {
  const patrimony = item.user_properties.find((it) => it.key === 'patrimony')
    ?.value?.string_value;

  const time = new Date(
    parseInt(item.event_timestamp, 10) / 1000,
  ).toLocaleTimeString();

  const date = `${item.event_date.substring(6, 8)}/${item.event_date.substring(4, 6)}/${item.event_date.substring(0, 4)}`;

  const current = item.event_params.find(
    (it) => it.key === 'firebase_screen_class',
  );

  return (
    <li key={item.event_timestamp}>
      <div className="container">
        <div className="dot" />
        {date} {time}
        <div className="navigation">
          <div className="item_header">
            <p className="event_name">{item.event_name.toLowerCase()}</p>
            <p className="patrimony">{patrimony}</p>
          </div>
          <div className="content">
            <p className="currentScreen">{current?.value.string_value}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
