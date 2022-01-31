import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import {
  Card, Col, Row, Switch,
} from 'antd';

const useStyles = createUseStyles({
  card: {
    margin: '2px',
    border: '1px brown dashed',
    width: 300,
    height: 400,
  },
});

type JsonResponse = Record<string, any>;

export const Scrapers = () => {
  const [indexer] = useState({} as JsonResponse);
  const [monitors] = useState({} as JsonResponse);

  const toggleIndexer = async () => {
    // FIXME: This route is broken right now
    // const scraperCall = wrapResponse(await sdkFetch<ScraperState>({
    //   endpoint: 'scrape',
    //   method: 'get',
    //   parameters: {
    //     toggle: 'indexer',
    //     mode: !indexer.Running,
    //   },
    // }));

    // if (isSuccessfulCall(scraperCall)) {
    //   setIndexer(scraperCall.data.indexer);
    // }
  };

  const toggleMonitors = async () => {
    // const scraperCall = wrapResponse(await sdkFetch<FixedScrape>({
    //   endpoint: 'scrape',
    //   method: 'get',
    //   parameters: {
    //     toggle: 'monitors',
    //     mode: !monitors.Running,
    //   },
    // }));

    // if (isSuccessfulCall(scraperCall)) {
    //   setMonitors(scraperCall.data.monitor);
    // }
  };

  const toggleBoth = async () => {
    // const bothOn = !(indexer.Running && monitors.Running);
    // const scraperCall = wrapResponse(await sdkFetch<FixedScrape>({
    //   endpoint: 'scrape',
    //   method: 'get',
    //   parameters: {
    //     toggle: 'both',
    //     mode: bothOn,
    //   },
    // }));

    // if (isSuccessfulCall(scraperCall)) {
    //   setIndexer(scraperCall.data.indexer);
    //   setMonitors(scraperCall.data.monitor);
    // }
  };

  useEffect(() => {
    // (async () => {
    //   const scraperCall = wrapResponse(await sdkFetch<FixedScrape>({
    //     endpoint: 'scrape',
    //     method: 'get',
    //     parameters: { status: 'both' },
    //   }));

    //   if (isSuccessfulCall(scraperCall)) {
    //     setIndexer(scraperCall.data.indexer);
    //     setMonitors(scraperCall.data.monitor);
    //   }
    // })();
  }, []);

  const styles = useStyles();
  return (
    <>
      <Row>
        <Col>
          <Card style={{ height: '500px' }} hoverable title={indexer.Name} className={styles.card}>
            both scrapers:
            {' '}
            <Switch
              checked={indexer.Running && monitors.Running}
              checkedChildren='on'
              unCheckedChildren='off'
              onClick={toggleBoth}
            />
            <br />
            index scraper:
            <Switch checked={indexer.Running} checkedChildren='on' unCheckedChildren='off' onClick={toggleIndexer} />
            <pre>{JSON.stringify(indexer, null, 2)}</pre>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '500px' }} hoverable title={monitors.Name} className={styles.card}>
            both scrapers:
            {' '}
            <Switch
              checked={indexer.Running && monitors.Running}
              checkedChildren='on'
              unCheckedChildren='off'
              onClick={toggleBoth}
            />
            <br />
            monitor scraper:
            {' '}
            <Switch checked={monitors.Running} checkedChildren='on' unCheckedChildren='off' onClick={toggleMonitors} />
            <pre>{JSON.stringify(monitors, null, 2)}</pre>
          </Card>
        </Col>
      </Row>
    </>
  );
};
