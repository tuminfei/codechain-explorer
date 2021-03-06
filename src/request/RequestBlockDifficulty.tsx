import * as _ from "lodash";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { BlockDoc } from "codechain-indexer-types/lib/types";
import { ApiError, apiRequest } from "./ApiRequest";

interface OwnProps {
    onBlockDifficulty: (difficulty: Array<{ x: string; y: string }>) => void;
    onError: (e: ApiError) => void;
}

interface DispatchProps {
    dispatch: Dispatch;
}

type Props = OwnProps & DispatchProps;

class RequestBlockDifficulty extends React.Component<Props> {
    public componentWillMount() {
        const { onError } = this.props;
        try {
            this.requestNodeStat();
        } catch (e) {
            onError(e);
        }
    }

    public render() {
        return null;
    }

    private requestNodeStat = async () => {
        const { onBlockDifficulty, dispatch } = this.props;
        const blocks: any = await apiRequest({
            path: `/blocks?page=1&itemsPerPage=50`,
            dispatch,
            showProgressBar: true
        });

        onBlockDifficulty(
            _.map(_.reverse(blocks), (block: BlockDoc) => {
                return {
                    x: block.number.toString(),
                    y: block.score
                };
            })
        );
    };
}

export default connect()(RequestBlockDifficulty);
