import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { AggsUTXO } from "codechain-indexer-types/lib/types";
import { ApiError, apiRequest } from "./ApiRequest";

interface OwnProps {
    address: string;
    onAggsUTXO: (aggsUTXO: AggsUTXO[]) => void;
    onError: (e: ApiError) => void;
}

interface DispatchProps {
    dispatch: Dispatch;
}

type Props = OwnProps & DispatchProps;

class RequestAssetTransferAddressUTXO extends React.Component<Props> {
    public componentWillMount() {
        const { address, onAggsUTXO, onError, dispatch } = this.props;
        const path = `aggs-utxo/${address}`;
        apiRequest({ path, dispatch, showProgressBar: true })
            .then((response: AggsUTXO[]) => {
                onAggsUTXO(response);
            })
            .catch(onError);
    }

    public render() {
        return null;
    }
}

export default connect()(RequestAssetTransferAddressUTXO);
