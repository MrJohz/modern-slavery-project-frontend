import React from 'react';

const flagImages = require.context('flag-icon-css/flags/4x3', false, /.svg$/);

import styles from './Flag.css';

function getFlagDataById(id: string): string {
    const svgSource = flagImages('./' + id + '.svg');

    // SOURCE: syntax from https://css-tricks.com/probably-dont-base64-svg/
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgSource);
}

type FlagOpts = { flagId: string };

export function Flag({ flagId }: FlagOpts) {
    return <img src={getFlagDataById(flagId)} className={styles.flag}/>;
}
