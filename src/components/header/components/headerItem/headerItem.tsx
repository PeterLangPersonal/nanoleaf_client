import { GraphContext } from '../../../../contexts/graph';
import { graphTypes } from '../../../../types';
import { useAppContext } from '../../../../utils';
import './headerItem.scss';

type HeaderItemProps = {
    title: graphTypes;
};

export const HeaderItem = ({
    title
}: HeaderItemProps) => {
    const { graphType, setGraphType } = useAppContext(GraphContext);

    const handleOnClick = () => {
        setGraphType(title);
    }

    const className = graphType === title? "headerItemSelected" : "headerItem";

    const displayTitle = title.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + ' ')

    return (
        <div className={className} onClick={handleOnClick}>
            <p className="headerItemTitle">
                {displayTitle}
            </p>
        </div>
    );
};;
