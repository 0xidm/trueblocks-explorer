import { QuestionCircleFilled } from '@ant-design/icons';
import { Result, toFailedResult, toSuccessfulData } from '@hooks/useCommand';
import { runCommand } from '@modules/core';
import { Button, Layout } from 'antd';
import 'antd/dist/antd.css';
import { either as Either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import './app.css';
import { Console } from './components/Console';
import { MainMenu } from './components/MainMenu';
import { HelpPanel } from './components/SidePanels/HelpPanel';
import { PanelDirection, SidePanel } from './components/SidePanels/SidePanel';
import { StatusPanel } from './components/SidePanels/StatusPanel';
import { Routes } from './Routes';
import useGlobalState from './state';
import { cookieVars } from './utils';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

const { Header, Footer, Content } = Layout;

const useStyles = createUseStyles({
  help_icon: { color: 'green' },
});

export const App = () => {
  dayjs.extend(relativeTime);

  const { debug, setDebug, setNames, names } = useGlobalState();
  const [status, setStatus] = useState<Result>(toSuccessfulData({ data: [{}], meta: {} }) as Result);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    (async () => {
      const eitherResponse = await runCommand('status');
      const result: Result = pipe(
        eitherResponse,
        Either.fold(toFailedResult, (serverResponse) => toSuccessfulData(serverResponse) as Result)
      );
      setStatus(result);
      setInterval(async () => {
        const eitherResponse = await runCommand('status');
        const result: Result = pipe(
          eitherResponse,
          Either.fold(toFailedResult, (serverResponse) => toSuccessfulData(serverResponse) as Result)
        );
        setStatus(result);
      }, 10 * 1000);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const eitherResponse = await runCommand('names', { expand: true, all: true });
      const result: Result = pipe(
        eitherResponse,
        Either.fold(toFailedResult, (serverResponse) => toSuccessfulData(serverResponse) as Result)
      );

      const arrayToObject = (array: any) =>
        array.reduce((obj: any, item: any) => {
          obj[item.address] = item;
          return obj;
        }, {});
      const resultMap = arrayToObject(result.data);

      setNames(resultMap);
    })();
  }, []);

  return (
    <Layout>
      <Header className='app-header'>TrueBlocks Account Explorer</Header>
      <Layout>
        <SidePanel
          header='Main menu'
          dir={PanelDirection.Left}
          cookieName={cookieVars.menu_expanded}
          collapsibleContent={false}>
          <MainMenu />
        </SidePanel>
        <Layout>
          <Layout>
            <Content
              style={{
                backgroundColor: 'white',
                padding: '1rem',
                overflowY: 'auto',
              }}>
              <Routes />
            </Content>
            <SidePanel header='Status' cookieName={cookieVars.status_expanded} dir={PanelDirection.Right}>
              <StatusPanel status={status} loading={loadingStatus} />
            </SidePanel>
            <SidePanel
              header='Help'
              cookieName={cookieVars.help_expanded}
              dir={PanelDirection.Right}
              customCollapseIcon={<QuestionCircleFilled className={styles.help_icon} />}
              customExpandIcon={<QuestionCircleFilled className={styles.help_icon} />}>
              <HelpPanel />
            </SidePanel>
          </Layout>
          <Footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button type={debug ? 'primary' : 'ghost'} onClick={() => setDebug(!debug)}>
              {debug ? 'debug on' : 'debug off'}
            </Button>
            <Console asText={true} />
            <div />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
