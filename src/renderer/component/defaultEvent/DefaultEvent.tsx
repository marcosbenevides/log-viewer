import { Card, CardContent, Chip, Typography } from '@mui/material';
import {
  DefaultEventParamKeyType,
  EventParamKeyType,
  IFirebaseLog,
} from '../../model/IFirebaseLog';
import './DefaultEvent.css';

export interface IDefaultEventProps {
  item: IFirebaseLog;
}

export function DefaultEvent(props: IDefaultEventProps) {
  const { item } = props;

  const patrimony = item.user_properties.find((it) => it.key === 'patrimony')
    ?.value?.string_value;

  const time = new Date(
    parseInt(item.event_timestamp, 10) / 1000,
  ).toLocaleTimeString();

  const date = `${item.event_date.substring(6, 8)}/${item.event_date.substring(4, 6)}/${item.event_date.substring(0, 4)}`;

  const methodName =
    item.event_params.find((it) => it.key === 'methodName')?.value
      ?.string_value ?? '';

  const params = item.event_params
    .filter((it) => !Object.values(EventParamKeyType).some((e) => e === it.key))
    .filter(
      (it) =>
        !Object.values(DefaultEventParamKeyType).some((e) => e === it.key),
    )
    .reduce((prev, curr) => {
      prev[curr.key] =
        curr.value.string_value ??
        curr.value.int_value ??
        curr.value.double_value ??
        curr.value.float_value;

      return prev;
    }, {} as any);

  return (
    <li key={item.event_timestamp}>
      <div className="container">
        <div className="dot" />
        {date} {time}
        <Card>
          <CardContent>
            <Chip variant="outlined" label={item.event_name.toLowerCase()} />
            <Chip variant="outlined" label={patrimony} />
            <Typography>{methodName}</Typography>
            <Typography whiteSpace="pre">
              {JSON.stringify(params, null, 4)}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </li>
  );

  /* return (
    <li key={item.event_timestamp}>
      <div className="container">
        <div className="dot" />
        {date} {time}
        <div className="item">
          <div className="item_header">
            <p className="event_name">{item.event_name.toLowerCase()}</p>
            <p className="patrimony">{patrimony}</p>
          </div>
          <div className="content">
            <p>{methodName}</p>
            <div className="json">
              <p>{JSON.stringify(params, null, 4)}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  ); */
}
