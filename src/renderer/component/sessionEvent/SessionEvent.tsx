import { IFirebaseLog } from '../../model/IFirebaseLog';
import './SessionEvent.css';

export interface ISessionEvent {
  item: IFirebaseLog;
}

export function SessionEvent({ item }: ISessionEvent) {
  const time = new Date(
    parseInt(item.event_timestamp, 10) / 1000,
  ).toLocaleTimeString();

  const date = `${item.event_date.substring(6, 8)}/${item.event_date.substring(4, 6)}/${item.event_date.substring(0, 4)}`;

  return (
    <li key={item.event_timestamp}>
      <div className="container">
        <div className="dot" />
        {date} {time}
        <div className="session">
          <div className="item_header">
            <p className="event_name">{item.event_name.toLowerCase()}</p>
          </div>
          <div className="content">
            <p>
              {item.device.mobile_os_hardware_model} {' - '}
              {item.geo.city}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
