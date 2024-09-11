/* eslint-disable no-nested-ternary */
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';

import HTTPIcon from '@mui/icons-material/Http';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PrintIcon from '@mui/icons-material/Print';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import SignalWifi0BarIcon from '@mui/icons-material/SignalWifi0Bar';
import ErrorIcon from '@mui/icons-material/Error';
import ContactlessIcon from '@mui/icons-material/Contactless';
import SignalCellularConnectedNoInternet4BarIcon from '@mui/icons-material/SignalCellularConnectedNoInternet4Bar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LoginIcon from '@mui/icons-material/Login';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import {
  DefaultEventParamKeyType,
  EventParamKeyType,
  IFirebaseLog,
} from '../../model/IFirebaseLog';
import './LogViewer.css';

export interface ILogViewerProps {
  data: IFirebaseLog[];
}

function Icon(props: { name: string }) {
  const { name } = props;
  if (name === 'paperless_printer') {
    return <PrintIcon />;
  }
  if (name === 'printer_miss_communication') {
    return <PrintIcon />;
  }
  if (name === 'timeout') {
    return <HourglassBottomIcon />;
  }
  if (name === 'device_miss_network') {
    return <SignalWifi0BarIcon />;
  }
  if (name === 'error_not_handler') {
    return <ErrorIcon />;
  }
  if (name === 'service_miss_communication') {
    return <SignalCellularConnectedNoInternet4BarIcon />;
  }
  if (name === 'order_flow') {
    return <ShoppingCartIcon />;
  }
  if (name === 'customer_flow') {
    return <PersonIcon />;
  }
  if (name === 'payment_flow') {
    return <PaymentsIcon />;
  }
  if (name === 'nfce_flow') {
    return <ReceiptLongIcon />;
  }
  if (name === 'print_flow') {
    return <PrintIcon />;
  }
  if (name === 'network_request' || name === 'network_response') {
    return <HTTPIcon />;
  }
  if (name === 'nfc_flow') {
    return <ContactlessIcon />;
  }
  if (name === 'screen_view') {
    return <MyLocationIcon />;
  }
  if (name === 'session_start') {
    return <LoginIcon />;
  }

  return <RssFeedIcon />;
}

export function LogViewer({ data }: ILogViewerProps) {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.1,
        },
        mt: 20,
      }}
    >
      {data.map((item) => {
        const time = new Date(
          parseInt(item.event_timestamp, 10) / 1000,
        ).toLocaleTimeString();

        const date = `${item.event_date.substring(6, 8)}/${item.event_date.substring(4, 6)}/${item.event_date.substring(0, 4)}`;

        const patrimony = item.user_properties.find(
          (it) => it.key === 'patrimony',
        )?.value?.string_value;

        const params = item.event_params
          .filter(
            (it) => !Object.values(EventParamKeyType).some((e) => e === it.key),
          )
          .filter(
            (it) =>
              !Object.values(DefaultEventParamKeyType).some(
                (e) => e === it.key,
              ),
          )
          .reduce((prev, curr) => {
            prev[curr.key] =
              curr.value.string_value ??
              curr.value.int_value ??
              curr.value.double_value ??
              curr.value.float_value;

            return prev;
          }, {} as any);

        const methodName =
          item.event_params.find((it) => it.key === 'methodName')?.value
            ?.string_value ?? '';

        const screenClass = item.event_params
          .find((it) => it.key === 'firebase_screen_class')
          ?.value.string_value?.match(/[A-Z][a-z]+/g)
          ?.join(' ')
          ?.toUpperCase();

        const { mobile_model_name, time_zone_offset_seconds } = item.device;
        const { version } = item.app_info;

        const timezone = !!time_zone_offset_seconds
          ? parseInt(time_zone_offset_seconds, 10) / 60 / 60
          : undefined;

        return (
          <TimelineItem>
            <TimelineOppositeContent>
              {date} {time}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <Icon name={item.event_name.toLowerCase()} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardHeader
                  subheader={
                    <>
                      <Chip
                        sx={{ marginRight: 1 }}
                        label={item.event_name.toLowerCase()}
                      />
                      <Chip
                        sx={{ marginRight: 1 }}
                        variant="outlined"
                        label={patrimony}
                      />
                      {!!screenClass && (
                        <Chip
                          sx={{ marginRight: 1 }}
                          variant="outlined"
                          label={screenClass}
                        />
                      )}
                      <Chip
                        sx={{ marginRight: 1 }}
                        variant="outlined"
                        // eslint-disable-next-line camelcase
                        label={mobile_model_name}
                      />
                      <Chip
                        sx={{ marginRight: 1 }}
                        variant="outlined"
                        label={version}
                      />
                      <Chip
                        sx={{ marginRight: 1 }}
                        variant="outlined"
                        label={timezone + " GMT"}
                      />
                    </>
                  }
                />
                {item.event_name.toLowerCase() === 'screen_view' ? (
                  <CardContent>
                    <Breadcrumbs
                      separator={<ArrowRightAltIcon />}
                      aria-label="breadcrumb"
                    >
                      <Typography variant="button">
                        {item.event_params
                          .find((it) => it.key === 'firebase_previous_class')
                          ?.value.string_value?.match(/[A-Z][a-z]+/g)
                          ?.join(' ')}
                      </Typography>
                      <Typography variant="button" color="secondary.light">
                        {item.event_params
                          .find((it) => it.key === 'firebase_screen_class')
                          ?.value.string_value?.match(/[A-Z][a-z]+/g)
                          ?.join(' ')}
                      </Typography>
                    </Breadcrumbs>
                  </CardContent>
                ) : item.event_name.toLowerCase() === 'user_engagement' ? (
                  <CardContent />
                ) : (
                  <CardContent>
                    <Typography variant="overline">{methodName}</Typography>
                    <Typography whiteSpace="pre" variant="body2">
                      <code>{JSON.stringify(params, null, 4)}</code>
                    </Typography>
                  </CardContent>
                )}
              </Card>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );

  // const renderItem = data.map((item) => {
  //   if (
  //     item.event_name === 'session_start' ||
  //     item.event_name === 'first_open'
  //   ) {
  //     return <SessionEvent key={item.event_timestamp} item={item} />;
  //   }

  //   if (item.event_name === 'screen_view') {
  //     return <NavigationEvent key={item.event_timestamp} item={item} />;
  //   }

  //   return <DefaultEvent key={item.event_timestamp} item={item} />;
  // });

  // return (
  //   <div className="page">
  //     <ul>{renderItem}</ul>
  //   </div>
  // );
}
