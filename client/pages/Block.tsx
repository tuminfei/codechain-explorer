import * as React from "react";
import { connect } from "react-redux";

import { Block as CoreBlock } from "codechain-sdk/lib/primitives";

import { RootState } from "../redux/actions";
import { RequestBlock } from "../components/requests";
import BlockDetails from "../components/BlockDetails";

interface Props {
    match: any;
}

interface StateProps {
    blocksByNumber: {
        [n: number]: CoreBlock;
    };
    blocksByHash: {
        [hash: string]: CoreBlock;
    }
}

class BlockInternal extends React.Component<Props & StateProps> {
    public render() {
        const { blocksByNumber, blocksByHash, match } = this.props;
        const { id } = match.params;
        const block = blocksByHash[id] || blocksByNumber[Number.parseInt(id)];

        if (!block) {
            return <RequestBlock id={id} />;
        }
        return (
            <div>
                <BlockDetails blockNumber={block.number} />
            </div>
        );
    }
}

const Block = connect((state: RootState) => {
    // FIXME:
    return {
        blocksByNumber: state.blocksByNumber,
        blocksByHash: state.blocksByHash
    } as StateProps;
})(BlockInternal);

export default Block;