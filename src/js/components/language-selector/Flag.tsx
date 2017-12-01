import React from 'react';

// const flagImages = require.context('flag-icon-css/flags/4x3', false, /.svg$/);
import defaultFlag from './default-flag.svg';

import styles from './Flag.css';

function addDataUrl(source: string): string {
    // SOURCE: syntax from https://css-tricks.com/probably-dont-base64-svg/
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(source);
}

type FlagProps = { flagId: string };

export class Flag extends React.Component<FlagProps, { flagUrl: string }> {

    private flagId: string;

    constructor(opts: FlagProps) {
        super(opts);

        this.flagId = opts.flagId;
        this.state = { flagUrl: addDataUrl(defaultFlag) };

        import(`flag-icon-css/flags/4x3/${this.flagId}.svg`)
            .then(source => addDataUrl(source))
            .then(url => this.setState({ flagUrl: url }));
    }

    render() {
        return <img src={this.state.flagUrl} className={styles.flag}/>;
    }
}
