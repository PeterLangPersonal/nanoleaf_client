import './header.scss';
import { graphTypes } from '../../types';
import { HeaderItem } from './components';

export const Header = () => {
    const headerTitles = Object.values(graphTypes);
    return(
        <div className="header">
            {
                headerTitles.map((title) => <HeaderItem title={title} key={title}/>)
            }
        </div>
    );
};
