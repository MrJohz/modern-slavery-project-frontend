import React from 'react';
import { cancellable, CancellablePromise } from '../../utils/promises-plus';

import defaultFlag from './default-flag.svg';
import styles from './Flag.css';

function addDataUrl(source: string): string {
    // SOURCE: syntax from https://css-tricks.com/probably-dont-base64-svg/
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(source);
}

type FlagProps = { flagId: string };

export class Flag extends React.Component<FlagProps, { flagUrl: string }> {

    private flagId: string;
    private flagPromise: CancellablePromise<string> | undefined;

    componentDidMount() {
        // Import the correct flag now that the component has mounted
        // Make it cancellable in case we haven't finished getting hold of
        // it by the time the component unmounts.
        this.flagPromise = cancellable(import(`flag-icon-css/flags/4x3/${this.flagId}.svg`));
        this.flagPromise
            .then(source => this.setState({flagUrl: addDataUrl(source)}))
            .then(() => {this.flagPromise = undefined});
    }

    componentWillUnmount() {
        // If the flag isn't loaded at this point, don't bother trying to insert it
        this.flagPromise && this.flagPromise.cancel();
    }

    constructor(opts: FlagProps) {
        super(opts);

        this.flagId = opts.flagId;
        this.state = { flagUrl: addDataUrl(defaultFlag) };
    }

    render() {
        return <img src={this.state.flagUrl} className={styles.flag}/>;
    }
}
