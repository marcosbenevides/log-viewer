/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Select,
  SelectChangeEvent,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LogViewer } from '../../component/logViewer/LogViewer';
import { IFirebaseLog } from '../../model/IFirebaseLog';
import './Home.css';

export interface ILoadedFile {
  name: String;
  createdAt: Date;
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 128,
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Home() {
  const [data, setData] = useState<IFirebaseLog[]>([]);
  const [date, setDate] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [archive, setArchive] = useState<File | undefined>();

  const loadFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const { files } = e.currentTarget;

    if (files != null && files.length > 0) {
      const file = files.item(0);
      if (file != null) {
        const url = URL.createObjectURL(file);
        setArchive(file);
        setDate('');
        setUser('');
        setType('');

        fetch(url)
          .then((response) => response.json())
          .then((result) => setData(result))
          .catch((err) => console.error(err));
      }
    }
  };

  const onChangeDate = (e: SelectChangeEvent) => {
    setDate(e.target.value as string);
  };

  const onChangeUser = (e: SelectChangeEvent) => {
    setUser(e.target.value as string);
  };

  const onChangeType = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
  };

  return (
    <Box>
      <AppBar position="fixed">
        <StyledToolbar>
          <Box
            width="100%"
            display="flex"
            marginBottom={4}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" noWrap component="div">
              LOG VIEWER
            </Typography>
            <Button
              sx={{ alignSelf: 'flex-end' }}
              component="label"
              role={undefined}
              variant="outlined"
              color="inherit"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Carregar log
              <VisuallyHiddenInput
                type="file"
                onChange={loadFile}
                accept=".json"
              />
            </Button>
          </Box>
          {data.length > 0 && (
            <Grid container spacing={2} width="100%">
              <Grid item xs={6} md={2}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="date-label">Data</InputLabel>
                  <Select
                    id="date"
                    labelId="date-label"
                    fullWidth
                    label="Data"
                    value={date}
                    onChange={onChangeDate}
                  >
                    <MenuItem value="">Selecione uma data</MenuItem>
                    {data
                      .map((it) => it.event_date)
                      .filter((it, index, arr) => arr.indexOf(it) === index)
                      .map((it) => (
                        <MenuItem value={it} key={it}>
                          {it.substring(6, 8)}/{it.substring(4, 6)}/
                          {it.substring(0, 4)}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={8}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="user-label">Usuário ID</InputLabel>
                  <Select
                    id="user"
                    labelId="user-label"
                    label="Usuário"
                    fullWidth
                    value={user}
                    onChange={onChangeUser}
                  >
                    <MenuItem value="">Selecione um usuário</MenuItem>
                    {data
                      .map((it) => it.user_id)
                      .filter(
                        (it, index, arr) =>
                          it !== null &&
                          it !== undefined &&
                          arr.indexOf(it) === index,
                      )
                      .map((it) => (
                        <MenuItem value={it!!} key={it}>
                          {it}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="type-label">Tipo Log</InputLabel>
                  <Select
                    id="type"
                    labelId="type-label"
                    label="Tipo"
                    value={type}
                    fullWidth
                    onChange={onChangeType}
                  >
                    <MenuItem value="">Selecione uma tipo</MenuItem>
                    {data
                      .map((it) => it.event_name)
                      .filter(
                        (it, index, arr) =>
                          it !== null &&
                          it !== undefined &&
                          arr.indexOf(it) === index,
                      )
                      .map((it) => (
                        <MenuItem value={it.toLowerCase()} key={it}>
                          {it.toLowerCase()}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </StyledToolbar>
      </AppBar>
      <LogViewer
        data={data
          .filter((it) => (date !== '' ? it.event_date === date : true))
          .filter((it) => (user !== '' ? it.user_id === user : true))
          .filter((it) =>
            type !== '' ? it.event_name.toLowerCase() === type : true,
          )}
      />
    </Box>
  );
}
